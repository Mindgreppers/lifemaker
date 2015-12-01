/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  AsyncStorage,
  View,
  Text,
  ProgressBarAndroid,
  Dimensions,
} = React

var styles = require('./appCode/styles/styles.js')
var SmokeSignalsPage = require('./appCode/components/SmokeSignals')
var ThreadPage = require('./appCode/components/SmokeSignal')
var CommentPage = require('./appCode/components/Comments')
var NavigatorPage = require('./appCode/components/Navigator')
var ProfilePage = require('./appCode/components/profile')
var ProfileEditPage = require('./appCode/components/ProfileEdit')
var NewThreadPage = require('./appCode/components/NewThread')
var RegisterPage = require('./appCode/components/RegisterPage')
var ApplicationHeader = require('./appCode/components/ApplicationHeader')
var Interest = require('./appCode/components/Interest')
var SmokeSignalsList = require('./appCode/components/LiveSS')
var CloseSSList = require('./appCode/components/CloseSS')
var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

var lifemaker = React.createClass({
  componentDidMount: function() {
    /*AsyncStorage.getItem('user').then(function(value){
      if(value != null) {
        console.log(value)
        this.setState({user: 1})
      }
      else {
        this.setState({user: 7})
      }
    }.bind(this))*/
  },

  getInitialState: function() {
    return {
      user: 7
    }
  },

  _renderScene: function(route, navigator){
    if (route.id === 1) {
      return <SmokeSignalsPage navigator={navigator}/>
    }  
    else if (route.id === 2) {
      return <ThreadPage id={route.smokeId} navigator={navigator}/>
    }
    else if(route.id === 3) {
      return <CommentPage navigator={navigator}/>
    }
    else if(route.id === 4) {
      return <ProfilePage navigator={navigator}/>
    }
    else if(route.id === 5) {
      return <ProfileEditPage navigator={navigator}/>
    }
    else if(route.id === 6) {
      return <NewThreadPage type={route.type} navigator={navigator}/>
    }
    else if(route.id === 7) {
      return <RegisterPage navigator={navigator}/>
    }
    else if(route.id === 8) {
      return <ApplicationHeader navigator={navigator}/>
    }
    else if(route.id === 9) {
      return <Interest navigator={navigator}/>
    }
    else if(route.id === 10) {
      return <SmokeSignalsList navigator={navigator}/>
    }
    else if(route.id === 11) {
      return <CloseSSList navigator={navigator}/>
    }
  },
  
  render: function() {
    console.log(this.state.user)
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
              return Navigator.SceneConfigs.FloatFromBottom;
          }}
    
        />
      )
    }
  }
});

AppRegistry.registerComponent('lifemaker', () => lifemaker);
