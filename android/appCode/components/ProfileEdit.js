//'use strict';
var React = require('react-native');

window.navigator.userAgent = 'react-native'
var Icon = require('react-native-vector-icons/Ionicons');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  TouchableHighlight,
  Dimensions,
  DrawerLayoutAndroid,
  ToastAndroid,
} = React

var styles = require('../styles/styles.js')
var ApplicationHeader = require('./ApplicationHeader')
var ScreenHeight = Dimensions.get('window').height
var SideBar = require('./SideBar')
var socket = require('../socket') 
var CreateSmokeSignal = require('./CreateSmokeSignal')
var UserStore = require('../Stores/UserStore')

var ProfileEditPage = React.createClass({

  getInitialState: function() {
    var UserData =  UserStore.getUserData()
    return {
      optionSelected: 1,
      name: UserData.name || '',
      interests:  UserData.interests.join(',') || '',
      whatburnsyou: UserData.whatburnsyou || '',
      email: UserData.email || '',
    }
  },

  componentDidMount: function() {
    socket.on('u-user.done', function(result){
      UserStore.updateInfo(result.params)
      ToastAndroid.show(result.message, ToastAndroid.SHORT)
      this.props.navigator.push({id: 1,})
    }.bind(this))  
  },

  onSelect: function(index){
    this.setState({
      optionSelected: index + 1
    })
  },
  
  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  submitEdits: function() {
    var profileEdits = {
      nick: UserStore.getUserData().nick,
      name: this.state.name,
      interests: this.state.interests.split(','),
      whatburnsyou: this.state.whatburnsyou,
      email: this.state.email
    } 
    socket.emit('u-user', profileEdits)
  },

  render: function() {
    
    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => <SideBar navigator={this.props.navigator}/>}>
          <ApplicationHeader openDrawer={this.openDrawer} title= 'ProfileEdit'/>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style = {styles.scrollView}
        >
          <View style={styles.container}>
            <Text style={styles.profileEditFields}>Name</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1 ,}}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            /> 
            <Text style={styles.profileEditFields}>Interests</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(interests) => this.setState({interests})}
              value={this.state.interests}
            /> 
            <Text style={styles.profileEditFields}>What keeps you burning?</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(whatburnsyou) => this.setState({whatburnsyou})}
              value={this.state.whatburnsyou}
            /> 
            <View style={styles.tagView}>
              <TouchableOpacity style={styles.profileEditButton} onPress={this.submitEdits}>
                <Text style={styles.sumitButton}>Submit</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        <CreateSmokeSignal navigator={this.props.navigator}/>
      </DrawerLayoutAndroid>
    )
  },
})
var Item = React.createClass({
  render: function() {
    var { title } = this.props;

    return (
      <View style={{ paddingTop: 7, paddingLeft: 10 }}>
        <Text>{ title }</Text>
      </View>
    )

  }

})
module.exports = ProfileEditPage
