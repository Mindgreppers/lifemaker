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
        from : 0, size : 2,
        query: {
          filtered: {
            query:    { match_all: params.match_all},
            filter:   { term: { active: true }}
          }
        }
      }
    }).then(function(resp) {

      var smokesignals = resp.hits.hits
      smokesignals.forEach(function(smokesignal){

        socket.join(smokesignal._id)

      })
      socket.emit('r-smokesignal.forall.done', {
        message: resp.hits.hits,
        counts: resp.hits.total,
        code: 200
      })

    }, function(err) {

      socket.emit('r-smokesignal.forall.error', {
        message: err.message,
        code: 404
      })
      error()

    })
}


if (require.main === module) {
  module.exports({
    match_all: {}
  })
}
