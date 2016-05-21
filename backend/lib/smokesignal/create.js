var _ = require('lodash')
var debug = require('debug')('ss/create')
var error = debug
error.log = console.log.bind(console)
//var socket = require('socket.io')(require('../../config.js').socket.port);
var es = require('../es')
const WOODS_FOR_SS = 2

module.exports = function (params, socket, io) {

	//fetching user information
    return es.get({
      index: 'users',
      type: 'user',
      id: params.userId
    })
		.catch(function(err) {

			error('woodAndKarma/onSmokeSignalCreation', err, params)
			if (err.status == 404) {

				error('woodAndKarma/onSmokeSignalCreation: user not found', params.userId)
			}
			throw err
		})
		.then(function(user) {
			if (user._source.woods < WOODS_FOR_SS) {

				socket.emit('c-smokesignal.error', 'Insufficient wood ' + user._source.woods)

			} else {

				return createSmokeSignal(params, socket, io)
				.then(function(res) {
					return updateWoods(params, user, io)
				})
				.then(function() {

					socket.emit('c-smokesignal.done', { result: {
            _source : params,
            _id: params._id
          }})
				})
			}
		})

}




	function createSmokeSignal (params, socket, io) {
  return es.index({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: _.pick(params, ['userId', 'title', 'category', 'ssType',
        'message', 'img', 'createdAt', 'burningTill',
        'active', 'thanks', 'nothanks', 'anonymous', 'comments'
      ])
    })
    .then(function(res) {//TODO improve this broadbast mechanism
      //Emit to users based on interested match to show in their 'For Me' signals
      var clients = findClientsSocket(io) ;
      debug(clients)
      clients.forEach(function(socket){
        socket.join(res._id)
      });
      emitToInterestedParties(io, params)

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

    })
    .catch(function(err) {
        // c-smokesignal.error: {message: 'Error in creating user in database', code: 500, err: err}
      socket.emit('c-smokesignal.error', {
        message: 'Error in creating smokesignal in database',
        code: 500,
        err: err
      })

      throw err

    })//TODO add  Currently it is throwing error
  //
}

function emitToInterestedParties(io, params) {

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

function updateWoods(params, user, io) {

	var smokeCreator = user._source

	//updating smokeCreator's wood
	smokeCreator.woods -= WOODS_FOR_SS
	//updating database
	return es.update({
		index: 'users',
		type: 'user',
		id: params.userId,
		body: {
				doc: _.pick(smokeCreator, ['woods'])
		}
	})
	.then(function(res) {
		io.to(smokeCreator.nick).emit('wood', {
			message: 'Deducted ' + WOODS_FOR_SS + ' woods. Your Wood = ' + smokeCreator.woods,
			code: '201',
			result: {
				user: smokeCreator
			}
		})

	})
	.catch(function(err) {
		error('Error in updating wood for user', userId, err)
		io.to(smokeCreator.nick).emit('wood' + '.error', {
			message: 'Error in processing your ' + params.action,
			code: '201'
		})
	})
}

// Hack to find all connected clients in an array
function findClientsSocket(io, roomId, namespace) {
    var res = [], ns = io.of(namespace = '/' );

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}


if (require.main === module) {

	var io = require('socket.io-client')

	var socket = io('http://localhost:3000', {jsonp: false, reconnection: true})
	socket.on('connect', function(){
		socket.emit('c-smokesignal.done', {
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
		})
	})
}
