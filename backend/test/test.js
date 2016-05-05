var app = require('express')()
var bodyParser = require('body-parser')

var config = require('../config.js');
var assert = require('chai').assert;
var es = require('../lib/es.js');

describe('DB connection',function(){
  describe('Test DB connection',function(){
    it('Should send a PING to DB root url, and not meet an error',function(done){
      es.ping({"hello":'elasticSearch!'})
        .then(function(){
          done();
        })
        .catch(function(){
            throw error;
        })
    })

  })
});
