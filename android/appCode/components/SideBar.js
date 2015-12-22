var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicons');

var {
  Text,
  View,
  TouchableOpacity,
} = React

var styles = require('../styles/styles.js')

var SideBar = React.createClass({
  render: function() {
    return (
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
        <TouchableOpacity style={styles.DrawerSmokeSignals}>
          <Icon
            name='log-out'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Profile</Text> 
        </TouchableOpacity>
      </View>
    )
  }
})

module.exports = SideBar
