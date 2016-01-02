'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

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
var SideBar = require('./SideBar')
var ScreenHeight = Dimensions.get('window').height
var ApplicationHeader =  require('./ApplicationHeader')
var UserStore = require('../Stores/UserStore')
var SmokeStore = require('../Stores/SmokeStore')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

var data = []

var ProfilePage = React.createClass({

  getInitialState: function() {

    return {
      dataSource: ds.cloneWithRows(data),
      user: UserStore.getUserData(),
      liveCount: 0,
      closeCount: 0,
    }

  },
 
  componentDidMount: function() {

    socket.on(UserStore.getUserData(), function(results) {
      ToastAndroid.show(results.message, ToastAndroid.SHORT)
    })
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

  profileEdit: function(){

    this.props.navigator.push({id: 5 ,})

  },

  showSmokeSignals: function(){

    this.props.navigator.push({id: 11, userId: this.state.user.nick})     

  },

  closeSmokeSignals: function() {

    this.props.navigator.push({id: 10, userId: this.state.user.nick})

  },

  openDrawer: function(){

    this.refs['DRAWER'].openDrawer()

  },

  render: function(){
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
        renderNavigationView={() => <SideBar navigator={this.props.navigator}/>}
      >
        <ApplicationHeader openDrawer={this.openDrawer} title= 'Profile'/>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style = {styles.scrollView}
        >
        <View style={styles.container}>
          <TouchableOpacity  onPress={this.profileEdit}>
            <Icon
              name='edit'
              size={25}
              color='#000000'
              style={styles.edit}
            /> 
          </TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <View style={styles.imageContainer}>
              <Text style={styles.profileImageText}>{this.state.user.nick[0].toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.profileText}>{this.state.user.name}</Text>
          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.thanksGiven.count} Thanks Given</Text>
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
          <Text style={styles.profileButtonText}>{this.state.user.woods} Woods</Text>
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
            <Text style={styles.profileButtonText}>{this.state.closeCount} Closed SmokeSignals</Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
         <CreateSmokeSignal navigator={this.props.navigator}/>
      </DrawerLayoutAndroid>
    )
  },
  
})

module.exports = ProfilePage
