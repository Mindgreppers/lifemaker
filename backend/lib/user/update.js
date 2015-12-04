var _ = require('lodash')
var debug = require('debug')('register')
//var socket = require('socket.io')(require('../../config.js').socket.port);
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

module.exports = function(params, socket, io) {
console.log(params)
  es.update({
      index: 'users',
      type: 'user',
      id: params.nick,
      body: {
        doc: _.pick(params, [
          'email', 'whatburnsyou', 'interests', 'name'
        ])
      }
    })
    .then(function(res) {
      socket.emit('u-user.done', {
        message: 'Profile Updated',
        code: 201,
        result: {
          user: params
        }
      })
    })
    .catch(function(err) {
      error('Error in updating user', err)
      socket.emit('u-user.error' + '.error', {
        message: 'Database error',
        code: 500,
        err: err
      })
    })
    .done()
}

if (require.main === module) {
  module.exports({
    _id: 'pankaj',
    tags: ['hb', 'man']
  })
}
