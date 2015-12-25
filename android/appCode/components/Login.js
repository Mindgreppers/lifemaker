'use strict';

var React = require('react-native')
var params = require('../../config')
var UserStore = require('../Stores/UserStore')

var {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ToastAndroid,
} = React

var styles = require('../styles/styles')
var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

var Login = React.createClass({
  getInitialState: function(){
    return {
      nickname:'',
    }
  },

  signUp: function() {
    this.props.navigator.push({id: 7})
  },

  _handleSubmit: function(id) {

    this.refs.nick.blur()
    var that = this
 
    var user = {
      nick: this.state.nickname,
    }

    fetch(params.ipAddress + '/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(user)
    })
    .then(function(response) {

      if(response.status === 200) {

        return response.json()

      } else if (response.status === 400) {

        ToastAndroid.show('Not Found', ToastAndroid.SHORT)
        that.props.navigator.push({id: 7})

        return {}
      }

    }).then(function(response) {

      if(response.nick === user.nick) {
        UserStore.storeUserData(response)
        that.props.navigator.push({id: 1})
      }

     }).done()

  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.interestPageTitle}>Login</Text>
        <Text style={styles.loginField}>Nickname</Text>
        <TextInput
          ref="nick"
          style={{height: 60, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(nickname) => this.setState({nickname})}
          value={this.state.nickname}
        /> 
        <View style={styles.button}>
          <TouchableOpacity style={styles.submitRegistration} onPress={this._handleSubmit}>
              <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpButton}>
          <TouchableOpacity onPress={this.signUp}>
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
})

module.exports = Login
