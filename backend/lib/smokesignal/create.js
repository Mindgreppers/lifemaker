var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)
//var socket = require('socket.io')(require('../../config.js').socket.port);
var es = require('../es')

module.exports = function(params, io, socket) {
  debug('error')
  es.index({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: _.pick(params, ['userId', 'title', 'type',
        'description', 'img', 'tags', 'createdAt', 'burningTill',
        'active', 'thanks', 'nothanks', 'anonymous', 'comments'
      ])
    })
    .then(function(res) {
      io.emit('c-smokesignal.done', {
        result: {
          _source : params,
          _id: params._id
        }
      })
      socket.emit('c-smokesignal.result', {
        message: 'Smokesignal Created',
        code: 201,
      })
    })
    .catch(function(err) {
      error('Error in indexing user', err)
        // c-smokesignal.error: {message: 'Error in creating user in database', code: 500, err: err}
      socket.emit('c-smokesignal.error', {
        message: 'Error in creating smokesignal in database',
        code: 500,
        err: err
      })

      throw err

    })
    .done()
}


if (require.main === module) {
  module.exports({
    _id: '1',
    userId: 'awesomepankaj',
    title: 'Wild vs Man',
    type: 'Need',
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
  }, socket)
}
