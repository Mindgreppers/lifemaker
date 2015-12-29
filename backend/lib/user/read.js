var _ = require('lodash')
var hashPassword = require('./password')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

/**
*@param nick
*/

module.exports = function(params, res) {
  es.get({
    index: 'users',
    type: 'user',
    id: params.nick
  })
  .then(function(response) {

    if(params.password) {
      if(hashPassword.validate(response._source.password, params.password) && params.nick === response._source.nick) {
        console.log(params, 'with password') 
        res.cookie('user', params.nick , { maxAge: 9000000000, httpOnly: true });
        res.status(200).json(response._source) 
      }
      else {
        res.status(401).json({message: 'Please check your nick and password'}) 
      }
    
    }
    else {
      res.status(200).json(response._source) 
    }

  })
  .catch(function(error){

    res.sendStatus(400)

  }).done()
}
if(require.main === module) {
  module.exports({
    nick: 'akshay',
    res: 'response'
  })
}
