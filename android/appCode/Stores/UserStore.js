var Reflux = require('reflux')

window.navigator.userAgent = 'react-native'; //or any other string value
var socket = require('../socket')
var UserActions = require('../Actions/UserActions')
var _ = require('lodash')

var UserStore = Reflux.createStore({

  init: function() {

    
  },

  data: {},

  getInitialState: function() {
    return this.data
  },
  //Store userData in Store
  storeUserData : function(userData) {
    this.data = userData
    socket.on(this.data.nick, function(data) {
      console.log(data.result.user)
      _.merge(this.data , data.result.user)
      this.trigger()
    }.bind(this))
    this.trigger()
  },

  //get User data from store
  getUserData: function() {
    return this.data 
  },

  updateInterests: function(interests) {
    this.data.interests = interests 
    this.trigger()
  },

  updateInfo: function(userData) {
    _.merge(this.data , userData)
    this.trigger()
    console.log(this.data)  
  },

})

module.exports = UserStore
