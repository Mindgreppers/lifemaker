var debug = require('debug')('ss-thanks')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

/**
 *@param action thanks, nothanks
 *@param count the number of times action was taken
 *@param _id id of the smokesignal
 *@param userId _id of the user who created the signal
 *@param thankerId _id of the user who thanked or nothanked
 *
 * */
module.exports = function(params, socket, io) {

  return es.update({
    index: 'smokesignals',
    type: 'smokesignal',
    id: params._id,
    body: {
      script: {
        file: 'ssAction',
        lang: 'groovy',
        params: {
          action: params.action,
          count: params.count
        }
      }
    }
  })
  .then(function(res) {
    /* BUG Instead of emitting to io, we should emit to some socket only */
    io.to(params._id).emit('u-smokesignal.action.done', {
      code: 200,
      message: params.action + ' +' + params.count,
      params: params
    })
  })
  .catch(function(err) {
    error('Error in ss action', err)
    console.log(err)
    socket.emit('u-smokesignal.' + params._id + '.action.error', {
      message: 'Error in ' + params.action,
      code: 500,
      err: err,
      params: params
    })
  })
}
