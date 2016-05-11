var io = require('socket.io-client/socket.io')
var params = require('../config')

var socket = io(params.ipAddress, {multiplex: false, jsonp: false, reconnection: true})


module.exports = socket
