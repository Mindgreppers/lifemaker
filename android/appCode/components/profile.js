'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var Button = require('react-native-button');

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

var MOCKED_USER_DATA =
  {
    nick: 'Abhishek',
    active_signals: 10,
    positive_karma: 50,
    negative_karma: 10,
    skills: ["Rails", "Sports"],
    interests: ["Travelling", "Music"],
    gravatar: "http://i.imgur.com/UePbdph.jpg"
  };


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

  _handlePress: function() {
    this.props.navigator.push({id: 13})
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

          <View style={styles.profileContainer}>
            <Image
              style={styles.gravatar}
              source={{uri: MOCKED_USER_DATA.gravatar}}
            />
          <View style={styles.profileInfo}>
              <Text style={styles.nick}>{MOCKED_USER_DATA.nick}</Text>
              <Button
                style={{fontSize: 20, color: 'green'}}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                View Activity
              </Button>
            </View>
          </View>

          <View style={styles.karmaContainer}>
            <View style={styles.karmaDetails}>
              <Text>Positive Karma</Text>
              <Text>10</Text>
            </View>
            <View style={styles.karmaDetails}>
              <Text>Negative Karma</Text>
              <Text>10</Text>
            </View>
          </View>

          <View>
            <Text style={styles.nick}>Skills</Text>
          </View>
          <View style={styles.skillsContainer}>
            {MOCKED_USER_DATA.skills.map(function(skill, index){
              return <View key={index} style={styles.skillContainer} ><Text style={styles.skill}>{skill}</Text></View>
            })}
          </View>

          <View>
            <Text style={styles.nick}>Interests</Text>
          </View>
          <View style={styles.skillsContainer}>
            {MOCKED_USER_DATA.interests.map(function(skill, index){
              return <View key={index} style={styles.skillContainer} ><Text style={styles.skill}>{skill}</Text></View>
            })}
          </View>

        </View>
        </ScrollView>
         <CreateSmokeSignal navigator={this.props.navigator}/>
      </DrawerLayoutAndroid>
    )
  },

})

module.exports = ProfilePage
