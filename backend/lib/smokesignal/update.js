var _ = require('lodash')
var debug = require('debug')('register')
//var socket = require('socket.io')(require('../../config.js').socket.port);
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

module.exports = function(params, socket) {
  debug('poakjshdksjd')
  es.update({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: {
        doc: _.pick(params, ['userId', 'title', 'subType',
          'description', 'img','createdAt', 'burningTill',
          'active', 'anonymous'
        ])
      }
    })
    .then(function(res) {
      socket.emit('u-smokesignal.done', {
        message: 'Smokesignal Updated',
        code: 200
      })
      console.log(res)
    })
    .catch(function(err) {
      error('Error in indexing user', err)
        // c-smokesignal.error: {message: 'Error in creating user in database', code: 500, err: err}
      socket.emit('u-smokesignal.error', {
        message: 'Error in creating smokesignal in database',
        code: 500,
        err: err
      })

      throw err

    })
    .done()
}


if (require.main === module) {
  module.exports({
    _id: 'pankaj',
    tags: ['hb', 'hb']
  })
}
