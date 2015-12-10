var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)
//var socket = require('socket.io')(require('../../config.js').socket.port);

var es = require('../es')

/**
 *@param nick
 *@param email
 */

module.exports = function(params, res) {
  if (!params.email) {

    error('email not specified', params)

    res.status(400).send('Email not specified')
    return

  } else if (!isValidEmail(params.email)) {
    error('email not valid', params)

    res.status(400).send('Invalid email address')
    return
  }

  if (!params.nick) {
    error('email not specified', params)

    res.status(400).send('Nick not specified')

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

      res.status(500).send('Database read error')
      throw err
    })
    .then(function(response) {

      if (response && response.found) {

        res.status(400).send('user exists!')
        debug('nick exists', params.nick, response)

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
            receivers: []
          }
        }
        es.index({
          index: 'users',
          type: 'user',
          id: params.nick,
          body: user
        })
        .then(function(response) {
          debug('registered', params.nick)

          res.cookie('user', params.nick , { maxAge: 9000000000, httpOnly: true });
          res.status(201).json({user: user, message: 'Successfully created user'})
        })
        .catch(function(err) {
          error('Error in indexing user', err)

          res.status(500).send('DB error in registering')
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
