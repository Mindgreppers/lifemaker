var React = require('react-native')
var {
  Text,
  View,
  TouchableOpacity
} = React

var styles = require('../styles/styles.js')
var SmokeSignalCategory = require('./SmokeSignalCategory')
var Utility = require('../utility')

var SmokeSignalBox = React.createClass({

  render: function() {

    return (
      <View>
        <SmokeSignalCategory category={ Utility.capitalise(this.props.category) || 'Dharma' } />
        <TouchableOpacity onPress={this.props.onSubmit}>
          <Text style={styles.description}>{this.props.message}</Text>
        </TouchableOpacity>
      </View>

    );
  }
});

module.exports = SmokeSignalBox
