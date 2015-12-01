var io = require('socket.io')(require('../config.js').socket.port);
var _ = require('lodash')

var auth = require('./auth')
//auth()

var consumers = {
  // user
  'c-user': 'user/create',
  'u-user': 'user/update',
  // smokesignal
  'c-smokesignal': 'smokesignal/create',
  'r-smokesignal.forall': 'smokesignal/read',
  //'r-smokesignal.count': 'smokesignal/count',
  'r-user.interest-matches': 'smokesignal/interestBasedSearch',
  'r-user.search': 'smokesignal/search',
  //'u-smokesignal': 'smokesignal/update',

  'u-smokesignal.comment': 'smokesignal/comment',
  'u-smokesignal.comment.thanks': ['smokesignal/comment-thanks', 'user/woodAndKarma'],
  'u-smokesignal.thanks': ['smokesignal/thanks', 'user/woodAndKarma']
}


io.on('connection', function(socket) {
  _.keys(consumers).forEach(function(ev, i) {
    var eventConsumers = consumers[ev]
    if (!_.isArray(eventConsumers)) {
      eventConsumers = [eventConsumers]
    }

    eventConsumers.forEach(function(evc) {
      evc = './' + evc
      var consume = require(evc)
      socket.on(ev, function(data) {
        consume(data, io, socket)
      })
    })
  })

})
