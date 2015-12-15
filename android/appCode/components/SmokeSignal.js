var React = require('react-native')

window.navigator.userAgent = 'react-native'

var Reflux = require('reflux')
var moment = require('moment')
var Icon = require('react-native-vector-icons/Ionicons');
var {
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
  ToolbarAndroid,
  Dimensions,
  TextInput,
  ToastAndroid,
} = React

var SmokeStore = require('../Stores/SmokeStore')
var socket = require('../socket')
var styles = require('../styles/styles.js')
var ApplicationHeader = require('./ApplicationHeader')
var CreateSmokeSignal = require('./CreateSmokeSignal')
var UserStore = require('../Stores/UserStore')

var ScreenHeight = Dimensions.get('window').height
var ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

var ThreadPage = React.createClass({

  mixins: [
    Reflux.ListenerMixin 
  ],

  componentDidMount: function() {
    this.listenTo(SmokeStore, this.refreshList) 
  },

  getInitialState: function() {
    console.log(this.props.id)
    return {
      showCommentBox: false,
      text: '',
      smokeSignal: SmokeStore.getSmokeSignal(this.props.id),
      comment: '',
    }
  
  },
  refreshList: function(message) {
    ToastAndroid.show(message.message, ToastAndroid.SHORT)
    this.setState({smokeSignal: SmokeStore.getSmokeSignal(this.props.id)})
  },

  _handleSubmit: function() {
    this.props.navigator.push({id : 3 ,}) 
  },

  handleProfilePage: function() {
    this.props.navigator.push({id : 4,})
  },

  onActionSelected: function(position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  },

  ssAction: function(ss) {
    socket.emit('u-smokesignal.thanks', {thankerId: UserStore.getUserData().nick, thankeeId: ss.userId, _id: this.state.smokeSignal._id, action: ss.action, count: 1})
  },
  
  addCommentAction: function(comment, e) {
    var commentThanks = {
      thankerId: UserStore.getUserData().nick,
      thankeeId: comment.userId,
      _id: this.state.smokeSignal._id,
      commentId: comment.commentId,
      action: comment.action,
      count: 1
    }
    socket.emit('u-smokesignal.comment.thanks', commentThanks)
  },
  
  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  showCommentBox: function() {
    if(!this.state.showCommentBox) {
      this.setState({showCommentBox: true})
      this.refs.comment.focus()
    }
    else {
      this.setState({showCommentBox: false})
    }
  },

  submitComment: function() {
    this.refs.comment.blur()
    this.setState({
      showCommentBox: false
    })
    var comment = {
      _id: this.state.smokeSignal._id,
      commentId: +moment() + '_' + Math.random(),
      text: this.state.comment,
      thanks: 0,
      nothanks: 0,
      userId: UserStore.getUserData().nick
    }
    
    this.setState({comment: ''})
    socket.emit('u-smokesignal.comment', comment)
  },

  submitCommentText: function(comment) {
    this.setState({comment: comment})
  },
  render: function() {
    var navigationView = (
      <View style={[styles.DrawerView,{height: ScreenHeight}]}>
        <View style={styles.DrawerHeading}>
          <Text style={styles.DrawerHeadingText}>LifeMaker</Text>
        </View>
        <View style={styles.DrawerSmokeSignals}>
          <Icon
            name='bonfire'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>SmokeSignals</Text> 
        </View>
        <View style={styles.DrawerSmokeSignals}>
          <Icon
            name='person'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Profile</Text> 
        </View>
      </View>
    )
    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <ApplicationHeader openDrawer={this.openDrawer} title= 'SmokeSignal'/>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            style = {styles.scrollView}
          >
          <View style={styles.container}>
            <Text style={styles.title}>{this.state.smokeSignal._source.title}</Text>
            <Text style={styles.tags}>{this.state.smokeSignal._source.tags.toString()}</Text>
            <Text style={styles.description}>{this.state.smokeSignal._source.description}</Text>

            <Text style={styles.timeInfoText}>Burning Since 5 minutes ago</Text> 
            <TouchableOpacity style={styles.label} onPress={this.ssAction.bind(this, {action: 'thanks', userId: this.state.smokeSignal._source.userId})}>
              <View>
                <Text style={styles.labelText}>{this.state.smokeSignal._source.thanks} Thanks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downvote} onPress={this.ssAction.bind(this, {action: 'nothanks'})}>
              <View>
                <Text style={styles.labelText}>{this.state.smokeSignal._source.nothanks}  NoThanks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.author} onPress={this.handleProfilePage}>
              <Text style={styles.author}>written by {this.state.smokeSignal._source.userId}</Text> 
            </TouchableOpacity>
            <View style={styles.commentStyle}>
              <Text style={styles.comments}>{this.state.smokeSignal._source.comments.length} Comments</Text>
              <TouchableOpacity style={styles.commentButton} onPress={this.showCommentBox}>
                <Text style={styles.commentText}>Comment</Text> 
              </TouchableOpacity>
            </View>
            {this.state.smokeSignal._source.comments.map(this.renderCommentBox)}
            <TouchableOpacity style={styles.showMoreButton} onPress={this._handleSubmit}>
              <Text style={styles.showMore}>show more</Text>
            </TouchableOpacity>
            {this.state.showCommentBox && 
            <View style={styles.commentInputView}>
            <TextInput
              ref= 'comment'
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 250}}
              onChangeText={this.submitCommentText}
              autoFocus= {true}
              value={this.state.comment}
              onBlur= {this.endEdits}
            />
            <TouchableOpacity style={styles.submitComment} onPress={this.submitComment}>
              <Icon
                name='android-send'
                size={25}
                color='#000000'
                style={{width:25,height:25}}
               />
            </TouchableOpacity>
            </View>
          }
          </View>
        </ScrollView>
        { !this.state.showCommentBox && <CreateSmokeSignal _addNeed={this._addNeed} _addOffer={this._addOffer} _addGeneral={this._addGeneral}/>}
      </DrawerLayoutAndroid>
    );
  },
   renderCommentBox: function(comment, i) {
     var that = this
    return (
      <View style={styles.comment} key={i}>
        <Text style={styles.description}>{comment.text}</Text>
        <View style={{flexDirection: 'row'}}>
         <TouchableOpacity onPress={that.addCommentAction.bind(that, {userId: comment.userId, commentId: comment.commentId, action: "thanks"})}>
            <View>
              <Text style={styles.thanks}>{comment.thanks} Thanks</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={that.addCommentAction.bind(that, {commentId: comment.commentId, action: "nothanks"})}>
            <View>
              <Text style={styles.nothanks}>{comment.nothanks} NoThanks</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.nothanks}>{comment.userId}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  },

  _handlePress(event) {
      console.log('Pressed!');
  },
  
  _addNeed: function() {
    this.props.navigator.push({id : 2, type : 'Need'})
  },

  _addOffer: function() {
    this.props.navigator.push({id : 2, type : 'Offer'})
  },
      
  _addGeneral: function() {
    this.props.navigator.push({id : 2, type : 'General'})
  },

});

module.exports = ThreadPage
