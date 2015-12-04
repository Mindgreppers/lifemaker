var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

/**
*@param nick
*/

module.exports = function(params, res) {
 console.log(params) 
  es.get({
    index: 'users',
    type: 'user',
    id: params.nick
  })
  .then(function(response) {

    res.status(200).json(response._source) 
    console.log(response)
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
