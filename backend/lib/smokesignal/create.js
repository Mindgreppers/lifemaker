var _ = require('lodash')
var debug = require('debug')('ss/create')
var error = debug
error.log = console.log.bind(console)
//var socket = require('socket.io')(require('../../config.js').socket.port);
var es = require('../es')

module.exports = function(params, socket, io) {
  es.index({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: _.pick(params, ['userId', 'title', 'category',
        'message', 'img', 'createdAt', 'burningTill',
        'active', 'thanks', 'nothanks', 'anonymous', 'comments'
      ])
    })
    .then(function(res) {//TODO improve this broadbast mechanism
      //Emit to users based on interested match to show in their 'For Me' signals
      emitToInterestedParties(params)
      //Broadcast to all the connected clients
      io.emit('c-smokesignal.done', {
        result: {
          _source : params,
          _id: params._id
        }
      })
      //Emit to the user who created the Signal
      socket.emit('c-smokesignal.result', {
        message: 'Smokesignal Created',
        code: 201,
      })
      //Join all the existing sockets to this smoke signal
      //Isn't this an overkill?
      //TODO consider a better/optimal way of notifying interested parties
      io.sockets.sockets.forEach(function(socket) {
        socket.join(params._id)
      })

    })
    .catch(function(err) {
        // c-smokesignal.error: {message: 'Error in creating user in database', code: 500, err: err}
      socket.emit('c-smokesignal.error', {
        message: 'Error in creating smokesignal in database',
        code: 500,
        err: err
      })

      throw err

    })//TODO add .done() Currently it is throwing error
  //  .done()
}

function emitToInterestedParties(params) {

  es.search({
    index: 'users',
    type: 'user',
    body: {
      query: {
          bool: {
              should: [
                  {match: { interests : params.message }}
              ]
          }
      }
   }
}).then(function(res) {

  if(!_.isEmpty(res.hits.hits)) {
    //Emit to each user whose interests match the signal
    //TODO Replace this with push notification
    res.hits.hits.forEach(function(user) {
      io.to(user._id).emit('interestsSmokeSignal', {
        result: {
          _source: params,
          _id: params._id
        }
      })
    })

  }

  }).catch(function(err) {

    error('Error in Getting Users by interest', err, params )

  })

}


if (require.main === module) {
  module.exports({
    _id: '1',
    userId: 'awesomepankaj',
    title: 'Wild vs Man',
    type: 'Need',
    category: 'Dharma',
    message: 'Demo MSG',
    description: 'kuch bhi',
    img: 'http://res.cloudnary.com/image.png',
    tags: ['wild', 'man', 'hb'],
    createdAt: '04.15',
    burningTill: '04.15',
    active: true,
    thanks: 0,
    nothanks: 0,
    anonymous: false,
    comments: []
  }, {emit: function(e, data){console.log('socket', e, data)}},  {emit: function(e, data){console.log('io', e, data)}})
}
