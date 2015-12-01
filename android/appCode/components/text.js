'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

var Text = React.createClass({
  render() {
      return (
            <TouchableOpacity>
              <View>
                <Text>hiiiiiiiii pankkaj</Text>
              </View>
            </TouchableOpacity>
          )
    },
});

AppRegistry.registerComponent('Text', () => Text);
module.exports = Text;
