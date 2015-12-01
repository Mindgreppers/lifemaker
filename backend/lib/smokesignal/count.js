var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

module.exports = function(params, socket) {

  es.count({
      index: params.count
    }).then(function(resp) {
      debug(resp.count)
      socket.emit('r-smokesignal.count.done', {
        message: resp.count,
        code: 200
      })
    }, function(err) {
      error(err.message)
      socket.emit('r-smokesignal.count.error', {
        message: err.message,
        code: 404
      })
    })
    .done()
}


if (require.main === module) {
  module.exports({
    count: 'smokesignals'
  })
}
