//'use strict';

var React = require('react-native')

window.navigator.userAgent = 'react-native'

var { AppRegistry, Text, View, TouchableOpacity, Image } = React

var styles = require('../styles/styles.js')
var ApplicationHeader = require('./ApplicationHeader')

var BuddhaSection = React.createClass({
  render: function() {

      var onPressThanksParams, onPressNoThanksParams, buddhaStyle, item;

      if(this.props.itemType === 'smokesignal'){
        onPressThanksParams = { action: 'thanks', userId: this.props.item._source.userId, smokeId: this.props.item._id}
        onPressNoThanksParams = { action: 'nothanks', userId: this.props.item._source.userId}
        buddhaStyle = styles.buddhaIcon
        item = this.props.item._source
      }
      else{
        onPressThanksParams = {userId: this.props.item.userId, commentId: this.props.item.commentId, action: "thanks"}
        onPressNoThanksParams = {userId: this.props.item.userId, commentId: this.props.item.commentId, action: "nothanks"}
        buddhaStyle = styles.buddhaIconSmall
        item = this.props.item
      }

      return (
        <View style= {{flexDirection: 'row', alignItems: 'center'}}>

          <View style={{flex: 0}}><Text style={styles.buddhaText}>{item.thanks}</Text></View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.props.onPress.bind(null, onPressThanksParams)}>
              <Image
                style={buddhaStyle}
                source={require('../img/happy_buddha.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 0}}><Text style={styles.buddhaText}>{item.nothanks}</Text></View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.props.onPress.bind(null, onPressNoThanksParams)}>
              <Image
                style={buddhaStyle}
                source={require('../img/normal_buddha.png')}
              />
            </TouchableOpacity>
        </View>
      </View>
    )
  }
});

module.exports = BuddhaSection
