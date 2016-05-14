'use strict';

var React = require('react-native');
var ActionButton = require('react-native-action-button');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React

var Button = React.createClass({
  getInitialState: function() {
    return {}
  },
  createss: function() {
    this.props.navigator.push({id: 2})
  },
  render: function() {
    return (
        <TouchableOpacity style={
        {width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#ee6e73',
          position: 'absolute',
          bottom: 18,
          alignItems: 'center',
          justifyContent: 'center',
          right: 18}} onPress={this.createss}>
          <Icon
            name='plus'
            size={18}
            color="#ffffff"
            style={{width: 18,height: 18, textAlign: 'center'}}
         />
        </TouchableOpacity>
    )
  }
})

module.exports = Button

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
