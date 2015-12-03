var app = require('express')()
var bodyParser = require('body-parser')

var server = app.listen(require('../config.js').socket.port)
var io = require('socket.io')(server)
var socketioJwt   = require("socketio-jwt")
var cookieParser = require('cookie-parser')

var _ = require('lodash')
var jwt = require('jsonwebtoken')

app.use(bodyParser.json()); 
app.use(cookieParser({secret: 'asdfasasdkj3d'}))
//app.use(bodyParser.urlencoded({ extended: true }));

var jwtSecret = '234jkh2j2h323jh23sadfkjh'

app.get('/login', function (req, res) {
console.log(req.cookies.user)
  if(req.cookies.user != '') {
    res.cookie('user', '' , { maxAge: 900000, httpOnly: true });
    res.sendStatus(200)
    socketConnection()
  }
  else {
    res.status(404).send({message: 'pankaj'})
    //res.send({message: 'pankaj'})
  }
})

app.post('/signup', function(req, res) {
  var createUser = require('./user/create')
  createUser(req.body, res)
  console.log(req.body)
})

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

/*io.set('authorization', socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));*/
var socketConnection = function() {

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
          consume(data, socket, io)
        })
      })
    })

  })
}
