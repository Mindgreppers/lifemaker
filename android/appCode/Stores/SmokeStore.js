window.navigator.userAgent = 'react-native'

var Reflux = require('reflux')
var SmokeActions = require('../Actions/SmokeActions')
var UserStore = require('./UserStore')
var _ = require('lodash')
var socket = require('../socket')
var SmokeStore = Reflux.createStore({

  data: {smokeSignals: [], interestsMatches: []},
  
  init: function() {
     
    socket.on('r-smokesignal.forall.done', function(smokesignals) {
      this.data.smokeSignals = smokesignals.message
      this.data.smokeSignals.forEach(function(smokeSignal) {
        socket.on('u-smokesignal.' + smokeSignal._id + '.commentAction.done', function(result){
          this.updateCommentAction(result.params, result.message)
        }.bind(this))

        socket.on('u-smokesignal.' + smokeSignal._id + '.done', function(result) {
          this.updateSmokeSignal(result)
        }.bind(this))
    
          
        socket.on('u-smokesignal.' + smokeSignal._id + '.action.done', function(result) {
          this.updatessAction(result.params, result.message)
        }.bind(this))
      }.bind(this))

      this.trigger()
    }.bind(this))

    socket.on('c-smokesignal.done', function(smokesignal) { 
      this.data.smokeSignals.unshift(smokesignal.result)
      this.trigger()
    }.bind(this))


    this.listenTo(SmokeActions.addSmokeSignal, this.addSmokeSignal)
    this.listenTo(SmokeActions.smokeSignal_Thanks, this.smokeSignal_Thanks)
    this.listenTo(SmokeActions.smokeSignal_NoThanks, this.smokeSignal_NoThanks)
    this.listenTo(SmokeActions.smokeSignal_PutOff, this.smokeSignal_PutOff)
    this.listenTo(SmokeActions.smokeSignal_Restart, this.smokeSignal_Restart)
  },
  //get all smokeSignals
  getSmokeSignals: function() {
    return [this.data.smokeSignals, this.data.interestsMatches]
  },

  request: function() {
    socket.emit('r-smokesignal.forall', {match_all: {}})
    return this.data.smokeSignals
  },

  getInterestsMatches: function() {

    var userData = UserStore.getUserData()
    this.data.user = Object.assign(userData)
    socket.emit('r-user.interest-matches', {userId: userData.nick, size: 20, from: 0}) 

    socket.on('r-user.' + userData.nick + '.interest-matches.done', function(res) {
      this.data.interestsMatches = res.results
      this.trigger()
    }.bind(this)) 

    return this.data.interestsMatches
  },

  updateSmokeSignal: function(smokeSignal) {
    var ss = _.find(this.data.smokeSignals, {_id: smokeSignal._id}) 
    if(!ss) {
      return
    }
    else if (smokeSignal.comment) {
      ss._source.comments.push(smokeSignal.comment)
      this.trigger({message: smokeSignal.message})
    }
    else {
      _.merge(ss, smokeSignal)
    }
    this.trigger()
  },
  
  updateCommentAction: function(params, message) {
    var ss = _.find(this.data.smokeSignals, {_id: params._id})
    var comment = _.find(ss._source.comments, {commentId: params.commentId})
    if(!comment) {
      return
    }
    comment[params.action] += 1
    this.trigger({message: message})
  },
  
  updatessAction: function(params, message) {
    var ss = _.find(this.data.smokeSignals, {_id: params._id})

    if(!ss) {
      return
    }
    ss._source[params.action] += 1
    
    this.trigger({message: message})
  },

  //get Smoke with id
  getSmokeSignal: function(smokeId) {
    
    var smokeSignal =  _.find(this.data.smokeSignals, {'_id': smokeId})
    
    return smokeSignal
  },

  addSmokeSignal: function(smokeSignal) {

    socket.emit('c-smokesignal', smokeSignal)

  },
})

module.exports = SmokeStore

