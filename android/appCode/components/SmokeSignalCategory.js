var React = require('react-native')
var {
  Text
} = React

var styles = require('../styles/styles.js')

var SmokeSignalCategory = React.createClass({
  render: function() {
    return (<Text style={styles.ssCategory}>{this.props.category}</Text>);
  }
});

module.exports = SmokeSignalCategory
