'use strict';

var React = require('react-native');
var {
  Text,
  View,
  TouchableOpacity,
  ToolbarAndroid,
  SwitchAndroid,
} = React

var { Icon, } = require('react-native-icons');
var styles = require('../styles/styles.js')
var ActionButton = require('./actionButton/ActionButton.js')
var NewThreadPage = require('./NewThread')

var CreateSmokeSignal = React.createClass({

  render: function() {
    return (
      <ActionButton bgColor="rgba(23, 9, 107, 0.75)" buttonColor="rgba(63,159,107,1)">
          <ActionButton.Item title="I Need" buttonColor='#9DC5BB' onPress={this.props._addNeed}>
            <Icon name="ion|help" size={20} color='white' style={{width:25,height:25}} />
          </ActionButton.Item>
          <ActionButton.Item title="I Offer" buttonColor='#EF476F' onPress={this.props._addOffer}>
            <Icon name="ion|pricetag" size={20} color='white' style={{width:25,height:25}} />
          </ActionButton.Item>
          <ActionButton.Item title="General" buttonColor='#151E3F' onPress={this.props._addGeneral}>
            <Icon name="ion|pricetag" size={20} color='white' style={{width:25,height:25}} />
          </ActionButton.Item>
        </ActionButton>

    )
   /* return (
      <TouchableOpacity style={styles.addSmoke} onPress={this.props._addSmoke}>
        <View style={{justifyContent: 'center',alignItems:'center',}}>
          <Icon
            name='ion|plus'
            size={30}
            color='#000000'
            style={{height:30,width:30, marginTop:15}}
          />
        </View>
      </TouchableOpacity>
    )*/
  }
})

module.exports = CreateSmokeSignal



































