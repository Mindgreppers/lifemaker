var React = require('react-native')
var {
  Text,
  View,
  TouchableOpacity
} = React

var styles = require('../styles/styles.js')
var SmokeSignalCategory = require('./SmokeSignalCategory')
var SmokeSignalType = require('./SmokeSignalType')
var Utility = require('../utility')

var SmokeSignalBox = React.createClass({

  render: function() {

    return (
      <View>
        <View style={styles.parentLabelContainer}>
          <SmokeSignalType value={ Utility.capitalise(this.props.ssType) || 'Offer' } />
          <SmokeSignalCategory category={ Utility.capitalise(this.props.category) || 'Dharma' } />
        </View>
        <TouchableOpacity onPress={this.props.onSubmit}>
          <Text style={styles.description}>{this.props.message}</Text>
        </TouchableOpacity>
      </View>

    );
  }
});

module.exports = SmokeSignalBox
