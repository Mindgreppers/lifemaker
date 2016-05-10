var _ = require('lodash')
var Q = require('q')
var debug = require('debug')('JoinUserRoom')
//var socket = require('socket.io')(require('../../config.js').socket.port);
var error = debug
error.log = console.log.bind(console)

module.exports = function(params, socket, io) {
  debug(params)
  socket.join(params.nick)
  return Q()
}
