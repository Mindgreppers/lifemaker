'use strict';

var React = require('react-native');
var ActionButton = require('react-native-action-button');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  View,
  StyleSheet,
} = React

var CreateSmokeSignal = React.createClass({

  render: function() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="I Need" onPress={this.props._addNeed}>
          <Icon name="help" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="I Offer" onPress={this.props._addOffer}>
          <Icon name="android-notifications-none" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="General" onPress={this.props._addGeneral}>
          <Icon name="android-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    )
  }
})

module.exports = CreateSmokeSignal

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

































