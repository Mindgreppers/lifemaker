var _ = require('lodash')
var debug = require('debug')('ss/create')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

module.exports = function (params, socket, io) { 
	return es.delete({
    index: 'smokesignals',
    type: 'smokesignal',
    id: params._id
  }).then(function(res) {

  	socket.emit('d-smokesignal.done', {result: res, message: 'Smoke signal delete successfully'})
  }).catch(function(res) {

  	socket.emit('d-smokesignal.done', 'Smoke Signal delete error')
  })
}