var React = require('react-native')
var {
  Text
} = React
var _ = require('lodash')

var styles = require('../styles/styles.js')
var smokeSignalCategories = require('../config').smokeSignalCategories
var Utility = require('../utility')

var SmokeSignalCategory = React.createClass({

  getColor: function(id) {
    var index = _.findIndex(smokeSignalCategories, { 'id': id});
    return smokeSignalCategories[index].color
  },

  render: function() {
    return (<Text style={ [styles.ssCategory, {backgroundColor: this.getColor(this.props.category)}] }>{this.getCategory(this.props.category)}</Text>);
  },

  getCategory: function(id) {
    var index = _.findIndex(smokeSignalCategories, { 'id': id});
    return Utility.capitalise(smokeSignalCategories[index].code);
  },
});

module.exports = SmokeSignalCategory
