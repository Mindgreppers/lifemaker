window.navigator.userAgent = 'react-native'

var Reflux = require('reflux')
var SmokeActions = require('../Actions/SmokeActions')
var UserStore = require('./UserStore')
var _ = require('lodash')
var socket = require('../socket')
var SmokeStore = Reflux.createStore({

  data: {smokeSignals: {}, forMe: [], forAll: [], forAllCount: 0, forMeCount: 0,},

  init: function() {

    socket.emit('r-smokesignal.forall', {match_all: {}})

    socket.emit('r-user.interest-matches', {userId: UserStore.getUserData().nick, size: 20, from: 0})

    socket.emit('joinUser', {nick: UserStore.getUserData().nick})

    socket.on('u-smokesignal.action.done', function(result) {
      console.log("Abhishek", result);
      this.updatessAction(result.params, result.message)

    }.bind(this))

    socket.on('u-smokesignal.commentAction.done', function(result){

      this.updateCommentAction(result.params, result.message)

    }.bind(this))

    socket.on('r-smokesignal.scroll.done', function(data){

      var scrollSignals = data.message.reduce(function(result, smokesignal) {
        result[smokesignal._id] = smokesignal
        return result
      }, {})

      _.merge(this.data.smokeSignals, scrollSignals)

      var signalsIds = data.message.map(function(signal) {
        return signal._id
      })

      this.data.forAll = _.union(this.data.forAll, signalsIds)

      console.log(this.data.forAll, signalsIds)

      console.log(this.data.smokeSignals, scrollSignals)
      this.trigger()

    }.bind(this))

    socket.on('u-smokesignal.done', function(result) {

      this.updateSmokeSignal(result)

    }.bind(this))

    socket.on('r-user.interest-matches.done', function(res) {
      this.data.forMeCount = res.counts
      this.data.forMe = res.results.map(function(signal) {
        return signal._id
      })

      var interestMatches = res.results.reduce(function(result, smokesignal) {
        result[smokesignal._id] = smokesignal
        return result
      }, {})

      _.merge(this.data.smokeSignals, interestMatches)

      this.trigger()

    }.bind(this))

    socket.on('r-smokesignal.forall.done', function(smokesignals) {

      this.data.forAllCount = smokesignals.counts

      this.data.forAll = smokesignals.message.map(function(signal) {
        return signal._id
      })
      this.data.smokeSignals = smokesignals.message.reduce(function(result, smokesignal) {
        result[smokesignal._id] = smokesignal
        return result
      },{})
      this.trigger()

    }.bind(this))

    socket.on('c-smokesignal.done', function(smokesignal) {
      this.data.forAllCount += 1
      this.data.smokeSignals[smokesignal.result._id] = smokesignal.result
      this.data.forAll.unshift(smokesignal.result._id)
      this.trigger()
      console.log(this.data.forAll)
      console.log(this.data.smokeSignals)

    }.bind(this))

    socket.on('interestsSmokeSignal', function(smokesignal) {
      this.data.forMeCount += 1
      this.data.forMe.unshift(smokesignal.result._id)
      this.trigger()
    }.bind(this))


    this.listenTo(SmokeActions.addSmokeSignal, this.addSmokeSignal)
    this.listenTo(SmokeActions.smokeSignal_Thanks, this.smokeSignal_Thanks)
    this.listenTo(SmokeActions.smokeSignal_NoThanks, this.smokeSignal_NoThanks)
    this.listenTo(SmokeActions.smokeSignal_PutOff, this.smokeSignal_PutOff)
    this.listenTo(SmokeActions.smokeSignal_Restart, this.smokeSignal_Restart)

  },

  getCount: function() {
    return [this.data.forMeCount, this.data.forAllCount]
  },
  //get all smokeSignals
  getSmokeSignals: function() {
    return [this.data.forAll, this.data.forMe]
  },

  request: function() {
    return [this.data.forAll, this.data.forMe]
  },

  getInterestsMatches: function() {

    return this.data.forMe

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
    var smokeSignal = this.data.smokeSignals[smokeId]

    return smokeSignal
  },

  addSmokeSignal: function(smokeSignal) {

    socket.emit('c-smokesignal', smokeSignal)

  },

  scrollSmokeSignals: function(params) {

    socket.emit('r-smokesignal.scroll', params)

  },
})

module.exports = SmokeStore
