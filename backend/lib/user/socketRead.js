var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

/**
*@param nick
*/

module.exports = function(params, socket, io) {
 console.log(params) 
  es.get({
    index: 'users',
    type: 'user',
    id: params.nick
  })
  .then(function(response) {

    socket.emit('r-user.done', {message: params.nick + ' Profile Information', result: response._source})

  })
  .catch(function(error){

    socket.emit('r-user.error', {message: 'error occure in read user from database', error: error})

  }).done()
}
if(require.main === module) {
  module.exports({
    nick: 'akshay',
    res: 'response'
  })
}
