var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)
  // var socket = require('socket.io')(require('../../config.js').socket.port);

var es = require('../es')

module.exports = function(params, socket, io) {
  debug(params)
  return es.search({
    index: 'smokesignals',
    type: 'smokesignal',
    body: {
      query: {
        bool: {
          must: {
              match_phrase: {userId: params.nick}
          }
        }
      }
    }
  }).then(function(resp) {

    socket.emit('r-userss.done', {
      message: resp.hits.hits,
      counts: resp.hits.total,
      active: params.active,
      code: 200
    })

  }, function(err) {

    socket.emit('r-userss.error', {
      message: err.message,
      code: 404
    })
    error()

  })

}


if (require.main === module) {
  module.exports({
    nick: 'pankaj'
  })
}
