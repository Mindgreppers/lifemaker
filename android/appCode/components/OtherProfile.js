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
      user: {},
      liveCount: 0,
      closeCount: 0,
    }
  },

  showSmokeSignals: function(){

    this.props.navigator.push({id: 11, userId: this.state.user.nick})     

  },

  closeSmokeSignals: function() {

    this.props.navigator.push({id: 10, userId: this.state.user.nick})

  },

  componentDidMount: function() {
    this.listenTo(UserStore, this.refreshList) 

    UserStore.getOtherUserProfile(this.props.userId)
    socket.on('r-user.done', function(data) {

      if(this.isMounted()) {
        this.setState({
          user: data.result 
        })  
      }

    }.bind(this))
    socket.emit('r-userss', {nick: this.state.user.nick, active: true})
    socket.emit('r-userss', {nick: this.state.user.nick, active: false})

    socket.on('r-userss.done', function(smokeSignals) {
      if(this.isMounted()) {
        if(smokeSignals.active) {
          this.setState({liveCount: smokeSignals.counts})
        }
        else {
          this.setState({closeCount: smokeSignals.counts})
        }
      }
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
          <View style={styles.profileImageContainer}>
            <View style={styles.imageContainer}>
              <Text style={styles.profileImageText}>{this.state.user.nick[0].toUpperCase()}</Text>
            </View>
          </View>

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
          { this.state.liveCount === 1 && <Text style={styles.profileButtonText}>{this.state.liveCount} Live SmokeSignal</Text> || <Text style={styles.profileButtonText}>{this.state.liveCount} Live SmokeSignals</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.thanksButton} onPress={this.closeSmokeSignals}>
            <Text style={styles.profileButtonText}>{this.state.closeCount} Close SmokeSignals</Text>
          </TouchableOpacity>
        </View>}
        </ScrollView>
         <CreateSmokeSignal navigator={this.props.navigator}/>
      </DrawerLayoutAndroid>
    )
  },
  
})
module.exports = OtherProfilePage
