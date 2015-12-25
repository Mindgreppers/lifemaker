'use strict';

var React = require('react-native');
var Reflux = require('reflux')
var Icon = require('react-native-vector-icons/Ionicons');
var _ = require('lodash')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
  Navigator,
  ToolbarAndroid,
  Dimensions,
  ToastAndroid,
} = React

var styles = require('../styles/styles.js')
var socket = require('../socket')
var CreateSmokeSignal = require('./CreateSmokeSignal')
var ScreenHeight = Dimensions.get('window').height
var SideBar = require('./SideBar')
var ApplicationHeader =  require('./ApplicationHeader')
var UserStore = require('../Stores/UserStore')
var SmokeStore = require('../Stores/SmokeStore')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

var OtherProfilePage = React.createClass({

  mixins: [
    Reflux.ListenerMixin 
  ],

  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([]),
      user: {}
    }
  },
 
  componentDidMount: function() {
    this.listenTo(UserStore, this.refreshList) 

    UserStore.getOtherUserProfile(this.props.userId)
    socket.on('r-user.done', function(data) {

      this.setState({
        user: data.result 
      })  

    }.bind(this))

  },

  refreshList: function() {

    this.setState({smokeSignal: SmokeStore.getOtherUserProfile(this.props.id)})

  },

  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },
  render: function(){
 
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <SideBar navigator={this.props.navigator}/>}
      >
        <ApplicationHeader openDrawer={this.openDrawer} title= 'Profile'/>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style = {styles.scrollView}
        >
        { !_.isEmpty(this.state.user) && <View style={styles.container}>
          <Text style={styles.profileText}>{this.state.user.nick}</Text>
          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.thanksGiven.count} Thanks Givens</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.thanksReceived.count} Thanks Received</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.karma} Karma</Text>
          </TouchableOpacity>

          <Text style={styles.profileText}>{this.state.user.interests.join(', ')}</Text>
          <TouchableOpacity style={styles.thanksButton} onPress={this.showSmokeSignals}>
            <Text style={styles.profileButtonText}>223 Lives SmokeSignal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.thanksButton} onPress={this.closeSmokeSignals}>
            <Text style={styles.profileButtonText}>223 Close SmokeSignal</Text>
          </TouchableOpacity>

        </View>}
        </ScrollView>
         <CreateSmokeSignal navigator={this.props.navigator}/>
      </DrawerLayoutAndroid>
    )
  },
  _renderSmokeSignals: function(smokeSignal) {
    var description = smokeSignal.description.slice(0,70) 
    return (
      <View style={styles.smokeSignal}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{smokeSignal.title}</Text>
          <TouchableOpacity>
            <Icon
              name='power'
              size={25}
              color='#000000'
              style={styles.edit}
            /> 
          </TouchableOpacity>
        </View>
        <Text style={styles.tags}>{smokeSignal.tags}</Text>
        <Text style={styles.description}>{description}.....</Text>
        <TouchableOpacity style={styles.upvoteLabel}>
          <Text style={styles.commentUpvote}>+20 woods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downvoteLabel}>
          <Text style={styles.commentDownvote}>- 5 woods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyLabel}>
          <Text style={styles.reply}>20 reply</Text>
        </TouchableOpacity>

      </View>
    )
  },

})
var SmokeSignalsList = React.createClass({
  render:function(){
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.props._renderSmokeSignals}
      />
    ) 
  }
})
var CloseSSList = React.createClass({
  render:function(){
    return (
      <View>
        <Text>Close</Text>
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.props._renderSmokeSignals}
      />
      </View>
    ) 
  }
})

module.exports = OtherProfilePage
