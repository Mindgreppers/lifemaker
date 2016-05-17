var _ = require('lodash')
var Q = require('q')
var debug = require('debug')('ss/comment')
// var socket = require('socket.io')(require('../../config.js').socket.port);
var error = debug
error.log = console.log.bind(console)

var es = require('../es')


module.exports = function(params, socket, io) {
  debug(params)

  var pickComment = _.pick(params, ['userId',
    'commentId', 'text', 'thanks', 'nothanks'
  ])

  return es.update({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: {
        script: {
          file: "addComment",
          params: {
            comment: pickComment
          }
        }
      }
    })
    .then(function(res) {
      socket.emit('u-smokesignal.done', {
        _id: params._id,
        comment: pickComment,
        message: 'comment Added',
        code: 200
      })
      debug(res)
      return Q()
    })
    .catch(function(err) {
      error('Error in indexing user', err)
        // c-smokesignal.error: {message: 'Error in creating user in database', code: 500, err: err}
      socket.emit('u-smokesignal.comment.error', {
        message: 'Error in creating smokesignal in database',
        code: 500,
        err: err
      })

      throw err

    })
}


if (require.main === module) {
  module.exports({
    _id: 'AVDiy9qffOG7glyvY3KR',
    commentId: '1446958237247_0.37142711761407554',
    text: 'pankaj frpmshs sjhsgsks s gig s abbak',
    thanks: 0,
    nothanks: 0,
    userId: 'Pankaj'
  }, socket)
}
