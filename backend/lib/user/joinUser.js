var _ = require('lodash')
var debug = require('debug')('JoinRoom')
//var socket = require('socket.io')(require('../../config.js').socket.port);
var error = debug
error.log = console.log.bind(console)

module.exports = function(params, socket, io) {
  debug(params)
  socket.join(params.nick)
}

