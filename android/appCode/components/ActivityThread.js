'use strict';

var React = require('react-native');
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
  ToolbarAndroid,
  Dimensions,
} = React

var ActivityThread = React.createClass({
  render:function(){
    return (
      <Text> Inside Activity Thread </Text>
    )
  }
})

module.exports = ActivityThread
