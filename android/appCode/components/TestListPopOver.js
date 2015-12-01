"use strict";

var React = require('react-native');
var ListPopover = require('./ListPopOver');
var { Icon, } = require('react-native-icons');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Component,
} = React;
var items = ["Item 1", "Item 2"];
var ActionButton = require('./actionButton/ActionButton.js')


var TestListPopover = React.createClass({

 render: function() {
    return (
     <View style={{flex:1}}>
      <Text>asdfsadfasdf</Text>
        <ActionButton bgColor="rgba(23, 9, 107, 0.75)" buttonColor="rgba(63,159,107,1)">
          <ActionButton.Item title="New Task" onPress={() => console.log("new task tapped!")}>
            <Icon name="ion|bonfire" size={15} color='black' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item title="My Notifications" onPress={() => {}}>
            <Icon name="ion|bonfire" size={15} color='black' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View> 
    );
  }
});

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 15,
    width:15,
    color: 'black',
  }, 
});

module.exports = TestListPopover
