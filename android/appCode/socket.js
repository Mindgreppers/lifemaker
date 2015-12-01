var io = require('socket.io-client/socket.io')
var params = require('../config')
var socket = io(params.ipAddress, {jsonp: false})

var connect = function(token) {
  console.log(token)
  socket = io(ipAddress, {
    jsonp: false,
    query: 'token=' + token  
  })

}
module.exports = socket
