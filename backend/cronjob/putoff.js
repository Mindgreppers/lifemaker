var _ = require('lodash')
var moment = require('moment')
var es = require('../lib/es')

var debug = require('debug')('put-off')

module.exports = function() {
	var query = {
      index: 'smokesignals',
      type: 'smokesignal',
      _source: false,
      body: {
        query: {
          filtered: {
            query: {
              range: {
                burningTill: {
                  lte: +moment()
                }
              }
            },
            filter: {
              term: {
                active: true
              }
            }
          }
        }
      }
    }

  return es
    .search(query)
    .then(function(res) {

      var updateInstructions = res.hits.hits.map(function(doc) {
        return [{
          update: {
            _id: doc._id
          }
        }, {
          doc: {
            active: false
          }
        }]
      })
      updateInstructions = _.flatten(updateInstructions)
      return es.bulk({
        body: updateInstructions,
        index: 'smokesignals',
        type: 'smokesignal'
      })
    })
    .then(function(res) {
      debug('updated', res)
    })
    .catch(function(err) {

      debug('error', err)
    })
    .done()
}

if (require.main === module) {
  module.exports()
}
