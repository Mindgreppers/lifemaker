import Reflux from 'reflux'
import SmokeActions from '../Actions/CommentsActions'

var CommentsStore = Reflux.createStore({

  data: { comments: []},

  getInitialState: function() {
    return this.data
  },

  init: function() {
    //listen the actions
    this.listenTo(Actions.addComment, this.addComment)
    this.listenTo(Actions.smokeSignal_Comment_Thanks, this.smokeSignal_Comment_Thanks)
    this.listenTo(Actions.smokeSignal_Comment_NoThanks, this.smokeSignal_NoThanks)
  },
  
  //get all smokeSignals
  getComments: function() {
    return this.data.comments
  },

  //add a new smokeSignal
  addComment: function(comment) {

    socket.emit('C-SmokeSignal:Comment', comment)

  },
  //add thanks on smokeSignal
  smokeSignal_Comment_Thanks: function(sscThanks) {
    
    socket.emit('U-SmokeSignal:Comment:Thanks', sscThanks)

  },
  //add Nothanks on SmokeSignal
  smokeSignal_Comment_NoThanks: function(sscNoThanks) {
    
    socket.emit('U-SmokeSignal:NoThanks', ssNoThanks)

  },
})

module.exports =CommentsStore
