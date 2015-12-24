var io = require('socket.io-client/socket.io')
var params = require('../config')

var socket = io(params.ipAddress, {jsonp: false, reconnection: true})


module.exports = socket
