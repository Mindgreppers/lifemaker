var React = require('react-native')
var {
  Text
} = React
var _ = require('lodash')

var styles = require('../styles/styles.js')
var smokeSignalCategories = require('../config').smokeSignalCategories



var SmokeSignalCategory = React.createClass({

  getColor: function(title) {
    var index = _.findIndex(smokeSignalCategories, { 'title': title});
    return smokeSignalCategories[index].color
  },

  render: function() {
    return (<Text style={ [styles.ssCategory, {backgroundColor: this.getColor(this.props.category)}] }>{this.props.category}</Text>);
  }
});

module.exports = SmokeSignalCategory
