var React = require('react-native')
var {
  Text
} = React
var _ = require('lodash')

var styles = require('../styles/styles.js')
var smokeSignalTypes = require('../config').smokeSignalTypes

var SmokeSignalType = React.createClass({

  getColor: function(title) {
    var index = _.findIndex(smokeSignalTypes, { 'title': title});
    return smokeSignalTypes[index].color
  },

  render: function() {
    return (<Text style={ [styles.ssCategory, {backgroundColor: this.getColor(this.props.value)}] }>{this.props.value}</Text>);
  }
});

module.exports = SmokeSignalType
