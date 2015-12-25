var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)
  // var socket = require('socket.io')(require('../../config.js').socket.port);

var es = require('../es')

module.exports = function(params, socket, io) {

  es.search({
    index: 'smokesignals',
    type: 'smokesignal',
    body: {
      query: {
        bool: {
          should: {
              match_phrase: {  userId: params.nick}
          },
          must: {
            match_phrase: { active: params.active}
          }
        }
      } 
    }
  }).then(function(resp) {

    console.log(resp.hits.total)
    socket.emit('r-userss.done', {
      message: resp.hits.hits,
      counts: resp.hits.total,
      code: 200
    })

  }, function(err) {

    socket.emit('r-userss.error', {
      message: err.message,
      code: 404
    })
    error()

  })
  .done()
}


if (require.main === module) {
  module.exports({
    nick: 'pankaj' 
  })
}
