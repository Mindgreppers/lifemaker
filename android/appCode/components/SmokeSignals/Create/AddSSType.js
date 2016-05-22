//'use strict';

var React = require('react-native')

window.navigator.userAgent = 'react-native'

var moment = require('moment')
var Reflux = require('reflux')
var Icon = require('react-native-vector-icons/Ionicons');
var Utility = require('../../../utility')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  DrawerLayoutAndroid,
  ListView,
  PixelRatio,
  ToastAndroid,
  ToolbarAndroid,
  TouchableHighlight
} = React


var socket = require('../../../socket')
var styles = require('../../../styles/styles.js')
var SideBar = require('../../SideBar')
var ApplicationHeader = require('../../ApplicationHeader')
var ScreenHeight = Dimensions.get('window').height
var smokeSignalTypes = require('../../../config').smokeSignalTypes

var AddSSType = React.createClass({
  getInitialState: function(){
    return {
      ssType: 0
    }
  },

  _handleNext: function() {
    this.props.navigator.push({ id: 13, ssType: this.getSSType(this.state.ssType).id })
  },

  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  getSSType: function(index) {
    return smokeSignalTypes[index];
  },

  closeSSPage: function() {
    this.props.navigator.pop()
  },

  _onPressButton: function(val) {
    this.setState({
      ssType: val
    })
  },

  render: function() {
    return (
      <DrawerLayoutAndroid
          style={{backgroundColor: '#ffffff'}}
          drawerWidth={300}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => <SideBar navigator={this.props.navigator}/>}>
        <ToolbarAndroid style={{backgroundColor: '#ffffff', height: 56}}>
          <View style={styles.headerBar}>
            <TouchableOpacity style={styles.closeButton} onPress={this.closeSSPage}>
              <Icon
                name='close'
                size={20}
                color='#26a69a'
                style={{width:20,height:20,marginLeft:5}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton}  onPress={this._handleNext}>
              <Text style={{color: '#26a69a'}}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </ToolbarAndroid>
        <View style={styles.ssTypeContainer}>
          { smokeSignalTypes.map( (ssCategory, index) => {
            return (
              <TouchableHighlight key={ssCategory.id} onPress={ () => this._onPressButton(index) }>
                <View style={[styles.ssType, {backgroundColor: ssCategory.color}, index === this.state.ssType && styles.highlight] }>
                  <Text style={styles.ssCategoryHeader}>
                    {Utility.capitalise(ssCategory.code)}
                  </Text>
                  <View>
                    <Text style={styles.ssCategoryText}>{ssCategory.description}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )
          })}
        </View>
      </DrawerLayoutAndroid>
    )
  },
})


module.exports = AddSSType
