var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)
//var socket = require('socket.io')(require('../../config.js').socket.port);

var es = require('../es')
var express = require('express')

app.post('/login', function (req, res) {

  // TODO: validate the actual user user
  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // we are sending the profile in the token
  var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });

  res.json({token: token});
});

/**
 *@param nick
 *@param email
 */

module.exports = function(params, io, socket) {
  if (!params.email) {
    //c-user.error: {message: 'Email not specified', code: 400});
    error('email not specified', params)
    socket.emit('c-user.error', {
      message: 'Email not specified',
      code: 400
    })

    return

  } else if (!isValidEmail(params.email)) {
    //c-user.error: {message: 'Invalid email address', code: 400}
    error('email not valid', params)
    socket.emit('c-user.error', {
      message: 'Invalid email address',
      code: 400
    })

    return
  }

  if (!params.nick) {
    //c-user.error: {message: 'Nick not specified', code: 400}
    error('email not specified', params)
    socket.emit('c-user.error', {
      message: 'Nick not specified',
      code: 400
    })

    return
  }

  es.get({
      index: 'users',
      type: 'user',
      id: params.nick
    })
    .catch(function(err) {
      if(err.status === 404) {
        return
      } 
      error('Error in finding user with given nick', err, params.nick)
      socket.emit('c-user.error', {
        message: 'Database read error',
        code: 500,
        err: err
      })
      throw err
    })
    .then(function(res) {

      if (res && res.found) {
        socket.emit('c-user.error', {
          message: 'user exists!',
          code: '400',
          params: params
        })
        debug('nick exists', params.nick, res)

      } else { //create user
        var user = {
          nick: params.nick,
          email: params.email,
          woods: 65,
          karma: 40,
          thanksReceived: {
            count: 0,
            givers: []
          },
          thanksGiven: {
            count: 0,
            received: []
          }
        }
        es.index({
          index: 'users',
          type: 'user',
          id: params.nick,
          body: user
        })
        .then(function(res) {
          debug('registered', params.nick)
          socket.emit('c-user.done', {
            message: 'Successfully created user',
            code: 201,
            params: user
          })
        })
        .catch(function(err) {
          error('Error in indexing user', err)
          socket.emit('c-user.error', {
            message: 'DB error in registering',
            code: 500,
            err: err,
            params: params
          })
        })
        .done()
      }
    })
    .catch()
    .done()
}

function isValidEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}


if (require.main === module) {
  module.exports({
    nick: 'sexyboy',
    email: 'vaibhavmule135@gmail.com',
    interests: ['hb']
  }, socket)
}
