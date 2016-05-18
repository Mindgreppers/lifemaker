var io = require('socket.io-client/socket.io')
var params = require('../config')

var socket = io(params.ipAddress, {jsonp: false, reconnection: true, transports: ['websocket']})


module.exports = socket
