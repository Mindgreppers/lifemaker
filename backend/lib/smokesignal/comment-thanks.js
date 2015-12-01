var _ = require('lodash')
var socket = require('socket.io')(4000);
var debug = require('debug')('comment-thanks')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')


module.exports = function(params, socket) {

  var commentAction = _.pick(params, ['count', 'commentId', 'action'])//where action is thanks or nothanks and count is number of times action is done

  es.update({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: {
        script: 'commentAction',
        params: commentAction
      }
    })
    .then(function(res) {
      socket.emit('u-smokesignal.' + params._id + '.commentAction.done', {
        code: 200,
        message: params.action + ' +' + params.count,
        params: params
      })
    })
    .catch(function(err) {
      error('Error in indexing user', err)
      socket.emit('u-smokesignal.' + params._id + '.commentAction.error', {
        message: 'Error in ' + params.action,
        code: 500,
        err: err,
        params: params
      })
    })
    .done()
}


if (require.main === module) {
  module.exports({
    _id: 'AVDiy9qffOG7glyvY3KR',
    commentId: '1446958237247_0.37142711761407554',
    thanks: 1
  }, socket)
}
