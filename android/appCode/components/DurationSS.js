var React = require('react-native')

window.navigator.userAgent = 'react-native'

var Dropdown = require('react-native-dropdown-android')
var Icon = require('react-native-vector-icons/Ionicons')
var moment = require('moment')

var {
  View,
  TouchableOpacity,
  Text,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Dimensions,
  ToastAndroid,
} = React


var SmokeStore = require('../Stores/SmokeStore')
var socket = require('../socket')
var UserStore = require('../Stores/UserStore')
var SideBar = require('./SideBar')
var styles = require('../styles/styles')
var ScreenHeight = Dimensions.get('window').height

var Durations = React.createClass({

  getInitialState: function() {
    return {
      selectedValue: 1   
    }
  },

  componentDidMount: function() {
    socket.on('c-smokesignal.result', function(result) {
      ToastAndroid.show(result.message, ToastAndroid.SHORT) 
      this.props.navigator.push({id : 1}) 
    }.bind(this))
  },

  _handleSubmit: function() {
    var smokeSignal = {
      userId: UserStore.getUserData().nick,
      _id: +moment() + '_'+ Math.random(),
      message: this.props.message,
      createdAt: +moment(),
      burningTill: +(moment().add(this.state.selectedValue, 'days')),
      active: true,
      thanks: 0,
      nothanks: 0,
      comments: [],
      anonymous: false,
    } 
    SmokeStore.addSmokeSignal(smokeSignal)
  },

  closeDurationsPage: function() {
    
    this.props.navigator.pop()

  },
  render: function() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <SideBar navigator={this.props.navigator}/>}
      >
        <ToolbarAndroid style={{backgroundColor: '#ffffff', height: 56}}>
          <View style={styles.headerBar}>
            <TouchableOpacity style={styles.closeButton} onPress={this.closeDurationsPage}>
              <Icon
                name='arrow-left-c'
                size={20}
                color='#26a69a'
                style={{width:20,height:20,marginLeft:5}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton}  onPress={this._handleSubmit}>
              <Text style={{color: '#26a69a'}}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </ToolbarAndroid>
        <View style={[styles.messageContainer, {height: ScreenHeight, alignItems: 'center'}]}>
          <Text style={{marginTop: 20, fontSize: 17}}>Set Durations</Text>
          <View style={styles.dropDownDuration}>
            <Dropdown
              style={styles.dropdown}
              values={[ 1, 4, 8, 10, 12, 15]} 
              selected={0} onChange={(data) => { this.setState({selectedValue: data.value}) }} />
              <Text style={styles.days}>Days</Text>
           </View>
        </View>
      </DrawerLayoutAndroid>
    )
  } 
})

module.exports = Durations
