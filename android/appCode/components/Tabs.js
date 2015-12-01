var ScrollableTabView = require('./index');
var React = require('react-native')
var { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, } = React;
var screenWidth = Dimensions.get('window').width
var App = React.createClass({
  render() {
    return (
      <ScrollableTabView>
        <ReactPage tabLabel="For Me" />
        <FlowPage tabLabel="For All" />
      </ScrollableTabView>
    );
  }
})
var ReactPage = React.createClass({
  render() {
    return (
      <View style={{width:screenWidth}}>
        <Text>Pankaj</Text>    
      </View>
    )
  }
})
var FlowPage = React.createClass({
  render() {
    return (
      <View style={{width:screenWidth}}>
        <Text>Pankaj from sundernagesadfsadfasdf sdf sadf asdf asd sdf sadfhsa jkdf sadr</Text>    
      </View>
    )
  }
})
var JestPage = React.createClass({
  render() {
    return (
      <Text>Pankaj from sundernager</Text>    
    )
  }
})
module.exports = App
