var React = require('react-native')
var {
  Text
} = React
var _ = require('lodash')

var styles = require('../styles/styles.js')
var smokeSignalTypes = require('../config').smokeSignalTypes
var Utility = require('../utility')

var SmokeSignalType = React.createClass({

  getColor: function(id) {
    var index = _.findIndex(smokeSignalTypes, { 'id': id});
    return smokeSignalTypes[index].color
  },

  render: function() {
    return (<Text style={ [styles.ssCategory, {backgroundColor: this.getColor(this.props.value)}] }>{this.getSSType(this.props.value)}</Text>);
  },

  getSSType: function(id) {
    var index = _.findIndex(smokeSignalTypes, { 'id': id});
    return Utility.capitalise(smokeSignalTypes[index].code);
  },
});

module.exports = SmokeSignalType
