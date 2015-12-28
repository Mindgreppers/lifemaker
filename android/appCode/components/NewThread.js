//'use strict';

var React = require('react-native')

window.navigator.userAgent = 'react-native'

var moment = require('moment')
var Reflux = require('reflux')
var Icon = require('react-native-vector-icons/Ionicons');

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
} = React


var socket = require('../socket')
var styles = require('../styles/styles.js')
var SideBar = require('./SideBar')
var ApplicationHeader = require('./ApplicationHeader')
var ScreenHeight = Dimensions.get('window').height

var ThreadPage = React.createClass({
  getInitialState: function(){
    return {
      message:'',
    }
  },

  _handleSubmit: function() {
    
    this.refs.message.blur()
    this.props.navigator.push({id: 12, message: this.state.message})

  },

  onSelect: function(index){
    this.setState({
      optionSelected: index + 1
    })
  },
  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

 
  closeSSPage: function() {
    this.props.navigator.pop()
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
            <TouchableOpacity style={styles.createButton}  onPress={this._handleSubmit}>
              <Text style={{color: '#26a69a'}}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </ToolbarAndroid>
          <View style={[styles.messageContainer, {height: ScreenHeight}]}>
            <TextInput
              style={{height: 120, borderWidth: 0, borderColor: '#ffffff',marginRight: 10, marginLeft: 10}}
              ref="message"
              placeholder="message"
              autoCapitalize="sentences"
              onChangeText={(message) => this.setState({message})}
              multiline={true}
              autoFocus={true}
              value={this.state.message}
            /> 
          </View>
      </DrawerLayoutAndroid>
    )
  },
})


module.exports = ThreadPage
