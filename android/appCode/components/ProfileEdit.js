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
    var navigationView = (
      <View style={[styles.DrawerView,{height: ScreenHeight}]}>
        <View style={styles.DrawerHeading}>
          <Text style={styles.DrawerHeadingText}>LifeMaker</Text>
        </View>
        <View style={styles.DrawerSmokeSignals}>
          <Icon
            name='bonfire'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>SmokeSignals</Text> 
        </View>
        <View style={styles.DrawerSmokeSignals}>
          <Icon
            name='person'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Profile</Text> 
        </View>
      </View>
    )

    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <ApplicationHeader openDrawer={this.openDrawer} title= 'ProfileEdit'/>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style = {styles.scrollView}
        >
          <View style={styles.container}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={this.profileEdit}>
                <Image
                  style={styles.editImage}
                  source={{uri: 'http://www.caretofun.net/wp-content/uploads/2015/07/beautiful-girl-profile-caretofun.net-6.jpg'}}
                /> 
                <Icon
                  name='camera'
                  size={25}
                  color='#000000'
                  style={{width:25,height:25,position:'absolute',top:35,left:35}}
                /> 
              </TouchableOpacity>
            </View>
            <Text style={styles.profileEditFields}>Name</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1 ,}}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            /> 
            <Text style={styles.profileEditFields}>email</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1 ,}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
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
