/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
  Dimensions,
  Navigator,
} = React;

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height
var params = require('./config')
var styles = require('./appCode/styles/styles')
var UserStore = require('./appCode/Stores/UserStore')

var LifeMaker = React.createClass({

  componentDidMount: function() {
    var that = this  
    fetch(params.ipAddress + '/login', {credentials: 'same-origin'})
    .then(function(res) {
      if(res.status === 200) {
        return res.json()
      }
      else {
        that.setState({user: 7})
      }
    }).then(function(response){
      console.log(response)
      if(response.nick){
        UserStore.storeUserData(response)
        that.setState({user: 1})
      }
    })

  },
  getInitialState: function() {
    return {
      user: 0
    }
  },

  _renderScene: function(route, navigator){
    if (route.id === 1) {
      var SmokeSignalsPage = require('./appCode/components/SmokeSignals')
      return <SmokeSignalsPage navigator={navigator}/>
    }
    else if (route.id === 2) {
      var NewThreadPage = require('./appCode/components/NewThread')
      return <NewThreadPage type={route.type} navigator={navigator}/>
    }
    else if (route.id === 3) {
      var SmokeSignalPage = require('./appCode/components/SmokeSignal')
      return <SmokeSignalPage id={route.smokeId} navigator={navigator}/>
    }
    else if (route.id === 4) {
      var ProfilePage = require('./appCode/components/profile')
      return <ProfilePage navigator={navigator}/>
    }
    else if (route.id === 5) {
      var ProfileEditPage = require('./appCode/components/ProfileEdit')
      return <ProfileEditPage navigator={navigator}/>
    }
    else if (route.id === 6) {
      var InterestPage = require('./appCode/components/Interest')
      return <InterestPage navigator={navigator}/>
    }
    else if (route.id === 7) {
      var SignUpPage = require('./appCode/components/RegisterPage')
      return <SignUpPage navigator={navigator}/>
    }
  }, 
    
  render: function() {
    if(this.state.user === 0) {
      return (
        <View style={styles.loadingView}>
          <View style={[styles.loading, {top: screenHeight / 2.5, right: screenWidth / 2.5}]}>
            <ProgressBarAndroid styleAttr='LargeInverse'/>
          </View>
        </View>
      )
    }
    else {
      return (
        <Navigator
          initialRoute={{id: this.state.user}}
          renderScene={this._renderScene}
          configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
          }}

        />
      )
    }
  }
});

AppRegistry.registerComponent('LifeMaker', () => LifeMaker);
