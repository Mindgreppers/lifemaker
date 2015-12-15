var app = require('express')()
var bodyParser = require('body-parser')

var server = app.listen(require('../config.js').socket.port)
var io = require('socket.io')(server)
var cookieParser = require('cookie-parser')

var _ = require('lodash')

app.use(bodyParser.json()); 
app.use(cookieParser({secret: 'asdfasasdkj3d'}))
//app.use(bodyParser.urlencoded({ extended: true }));


app.get('/login', function (req, res) {

  if(req.cookies.user != '') {
    var readUser = require('../lib/user/read')
    console.log(req.cookies.user)
    var params = {nick: req.cookies.user}
    readUser(params, res) 
   // res.cookie('user', '' , { maxAge: 900000, httpOnly: true });
  }
  else {

    res.status(404).send({message: 'pankaj'})
    testSocketConnection()

  }
})

app.post('/signup', function(req, res) {

  var createUser = require('./user/create')
  createUser(req.body, res)

})

var consumers = {
  // user
 // 'c-user': 'user/create',
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
          consume(data, socket, io)
        })
      })
    })

})
