var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)
  // var socket = require('socket.io')(require('../../config.js').socket.port);

var es = require('../es')

module.exports = function(params, socket, io) {

  return es.search({
      index: 'smokesignals',
      type: 'smokesignal',
      body: {
        from : params.from,
        size : params.size,
        query: {
          filtered: {
            query:    { match_all: params.match_all},
            filter:   { term: { active: true }}
          }
        },
        sort: {
          createdAt: 'desc'
        }
      }
    }).then(function(resp) {
      var smokesignals = resp.hits.hits
      smokesignals.forEach(function(smokesignal){
        socket.join(smokesignal._id)
      })
      socket.emit('r-smokesignal.scroll.done', {
        message: resp.hits.hits,
        counts: resp.hits.total,
        code: 200
      })

    }, function(err) {

      socket.emit('r-smokesignal.scroll.error', {
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
