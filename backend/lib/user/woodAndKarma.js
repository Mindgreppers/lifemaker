var _ = require('lodash')
var debug = require('debug')('user/woodAndKarma')
var error = debug
error.log = console.error.bind(console)

var es = require('../es')

module.exports = function(params, socket) {

  es.mget({
    index: 'users',
    type: 'user',
    body: {
      ids: [params.thankerId, params.thankeeId]
    }

  }).catch(function(err) {
    error('Error in getting users from DB', params)

  }).then(function(res) {

    if (!res) {
      return
    }

    var thanker = res.docs[0]._source
    var thankee = res.docs[1]._source

    if (!thanker) {
      error('thanker not found', params.thankerId)
      return
      //throw new Error('Not found Thanker ' + params.thankerId)
    }
    if (!thankee) {
      error('thankee not found', params.thankeeId)
      return
      //throw new Error('Not found Thankee ' + params.thankeeId)
    }

    //Update Thankee
    if (params.action === 'thanks') {
      thankee.woods += params.count
      thankee.karma += params.count
    } else {
      thankee.karma -= params.count
    }

    thankee[params.action + 'Received'].count += params.count

    var thankeesThankers = thankee[params.action + 'Received'].givers
    if (!_.find(thankeesThankers, params.thankerId)) {
      thankeesThankers.push(thankerId)
    }

    //Update thanker
    thanker.woods -= params.count
    thanker.karma += params.count * 0.2
    thanker[params.action + 'Given'].count += params.count

    var thankersThankees = thanker[params.action + 'Given'].receivers
    if (!_.find(thankersThankees, params.thankeeId)) {
      thankersThankees.push(thankeeId)
    }

    es.bulk_index({
      index: 'users',
      type: 'user',
      docs: [thanker, thankee]
    }).then(function(res) {
      socket.emit(params.thankeeId, {
        message: 'Thanks! Your Karma = ' + thankee.karma + ' Wood = ' + thankee.wood,
        code: '201',
        result: {
          user: thankee
        }
      })
      socket.emit(params.thankerId, {
        message: 'Thanks! Your Karma = ' + thanker.karma + ' Wood = ' + thanker.wood,
        code: '201',
        result: {
          user: thanker
        }
      })
    }).catch(function(err) {
      error('Error in updating woodsAndKarma', err)
      socket.emit(params.thankerId + '.error', {
        message: 'Error in processing your ' + params.action,
        code: '201'
      })
    })
  })
}
