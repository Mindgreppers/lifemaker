var React = require('react-native')

window.navigator.userAgent = 'react-native'

var Icon = require('react-native-vector-icons/Ionicons');

var {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} = React

var UserStore = require('../Stores/UserStore')
var screenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
var styles = require('../styles/styles.js')

var SideBar = React.createClass({

  getInitialState: function() {
    return {}
  },

  logout: function() {
    var that = this
    fetch(params.ipAddress + '/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({nick: UserStore.getUserData.nick})
    })
    .then(function(response) {
      if(response.status === 200) {
        that.props.navigator.push({id: 8})
      }
      else if (response.status === 400) {
        ToastAndroid.show(response._bodyText, ToastAndroid.SHORT)
        return {}
      }
    }).done()
  },

  gotoProfile: function() {
    this.props.navigator.push({id: 4})
  },

  gotoSignals: function() {
    this.props.navigator.push({id: 1})
  },

  render: function() {
    return (
      <View style={[styles.DrawerView,{height: ScreenHeight}]}>
        <View style={styles.DrawerHeading}>
          <Text style={styles.DrawerHeadingText}>LifeMaker</Text>
        </View>
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.gotoSignals}>
          <Icon
            name='bonfire'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>SmokeSignals</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.gotoProfile}>
          <Icon
            name='person'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Profile</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.logout}>
          <Icon
            name='log-out'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Logout</Text> 
        </TouchableOpacity>
      </View>
    )
  }
})

module.exports = SideBar
