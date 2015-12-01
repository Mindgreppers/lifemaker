var _ = require('lodash')
var debug = require('debug')('register')
var error = debug
error.log = console.log.bind(console)

var es = require('../es')

module.exports = function(params, socket) {

  es.search({
    index: 'smokesignals',
    type: 'smokesignal',
    body: {
      size: params.size,
      from: params.from,
      query: {
        bool: {
          should: [{
            match_phrase: {
              tags: {
                query: params.searchText,
                boost: 2
              }
            }
          }, {
            match_phrase: {
              title: {
                query: params.searchText,
                boost: 4
              }
            }
          }, {
            match_phrase: {
              description: params.searchText
            }
          }]
        }
      }
    }
  }).then(function(resp) {

    socket.emit('r-user.' + params.userId + '.search.done', {
      message: 'Found ' + resp.hits.hits.length + ' Smoke Signals',
      results: resp.hits.hits,
      code: 200
    })

  }).catch(function(err) {

    error('Error in searching smokesignals', err)
    socket.emit('r-user.' + params.userId + '.search.error', {
      message: 'Error in searching smokesignals',
      code: 404,
      err: err
    })

  })
  .done()
}


if (require.main === module) {
  var io = require('socket.io')(require('../../config').socket.port);
  module.exports({
    search: {
      searchText: 'hb',
      from: 10,
      size: 1
    }
  }, io)
}
