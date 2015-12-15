var _ = require('lodash')
var debug = require('debug')('register')
// var socket = require('socket.io')(require('../../config.js').socket.port);
var error = debug
error.log = console.log.bind(console)

var es = require('../es')


module.exports = function(params, socket, io) {
  console.log(params)

  var pickComment = _.pick(params, ['userId',
    'commentId', 'text', 'thanks', 'nothanks'
  ])

  es.update({
      index: 'smokesignals',
      type: 'smokesignal',
      id: params._id,
      body: {
        script: "addComment",
        params: {
          comment: pickComment
        }
      }
    })
    .then(function(res) {
      io.to(params._id).emit('u-smokesignal.done', {
        _id: params._id,
        comment: pickComment,
        message: 'comment Added',
        code: 200
      })
      debug(res)
    })
    .catch(function(err) {
      error('Error in indexing user', err)
        // c-smokesignal.error: {message: 'Error in creating user in database', code: 500, err: err}
      io.to(params._id).emit('u-smokesignal.comment.error', {
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
    _id: 'AVDiy9qffOG7glyvY3KR',
    commentId: '1446958237247_0.37142711761407554',
    text: 'pankaj frpmshs sjhsgsks s gig s abbak',
    thanks: 0,
    nothanks: 0,
    userId: 'Pankaj'
  }, socket)
}
