'use strict';

var React = require('react-native');
var {
  Text,
  View,
  TouchableOpacity,
  Image,
  ToolbarAndroid,
  SwitchAndroid,
} = React

var { Icon, } = require('react-native-icons');
var styles = require('../styles/styles.js')

var PageHeader = React.createClass({
  getInitialState: function(){
    return {
      toolbarSwitch: false,
    }
  },

  _onActionSelected: function(position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  },
  render: function(){
    return (
      <ToolbarAndroid
        style={{backgroundColor:'#f0f0f0', height:56, color:'#000000', fontSize:10,}}>
        <View style={styles.headerBar}>
          <Text style={styles.interestTitle}>SmokeSignal</Text>
          <TouchableOpacity style={styles.sort}>
            <Icon
              name='fontawesome|sort-alpha-asc'
              size={20}
              color='#ffffff'
              style={styles.icon}
            /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Icon
              name='ion|funnel'
              size={20}
              color='#ffffff'
              style={styles.icon}
            /> 
          </TouchableOpacity>

        </View>
      </ToolbarAndroid>
    )
  }
})

module.exports = PageHeader
