//'use strict';

var React = require('react-native')

window.navigator.userAgent = 'react-native'

var connect = require('../socket')
var params = require('../../config')
var UserStore = require('../Stores/UserStore')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  AsyncStorage,
  Dimensions,
} = React

var styles = require('../styles/styles')
var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

var RegisterPage = React.createClass({
  getInitialState: function(){
    return {
      nickname:'',
      email:'',
      password:'',
      isOpen: false,
      isDisabled: false,
      error:'',
    }
  },

  _handleSubmit: function(id) {

    var that = this

    var user = {
      nick: this.state.nickname,
      email: this.state.email,
      woods: 65,
      karma: 42
    }
   
    fetch(params.ipAddress + '/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(user)
    })
    .then(function(response) {
      console.log(response)
      if(response.status === 201) {
        return response.json()
      }
      else if (response.status === 400) {
        ToastAndroid.show(response._bodyText, ToastAndroid.SHORT)
        return {}
      }
    }).then(function(response) {
      if(response.message) {
        ToastAndroid.show(response.message, ToastAndroid.SHORT)
        UserStore.storeUserData(response.user)
        that.props.navigator.push({id: 6})
      }
     }).done()
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.interestPageTitle}>Signup</Text>
        <Text style={styles.loginField}>Nickname</Text>
        <TextInput
          style={{height: 60, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(nickname) => this.setState({nickname})}
          value={this.state.nickname}
        /> 
        <Text style={styles.loginField}>Email</Text>
        <TextInput
          style={{height: 60, borderColor: 'gray', borderWidth: 1}}
          keyboardType={'email-address'}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <View style={styles.button}>
          <TouchableOpacity style={styles.submitRegistration} onPress={this._handleSubmit}>
              <Text>Submit</Text>
          </TouchableOpacity>
         </View>
         {this.state.progress &&
            <View style={{height: screenHeight,width: screenWidth, position: 'absolute', backgroundColor: 'trasperant'}}>
            </View>
         } 
      </View>
    )
  },
})

module.exports = RegisterPage
