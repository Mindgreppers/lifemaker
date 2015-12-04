/**
 * LifeMaker
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
var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height
var params = require('./config')
var UserStore = require('./appCode/Stores/UserStore')
var lifemaker = React.createClass({
  componentDidMount: function() {
    /*AsyncStorage.getItem('token').then(function(value){
      if(value != null) {
        console.log(value)
        this.setState({user: 1})
      }
      else {
        this.setState({user: 7})
      }
    }.bind(this))
   AsyncStorage.removeItem('token').then(function(val){
      console.log(val)
   })*/
    var that = this
    fetch(params.ipAddress + '/login', {credentials: 'same-origin'})
    .then(function(res) {
      //console.log(res._bodyText)
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
      var ThreadPage = require('./appCode/components/SmokeSignal')
      return <ThreadPage id={route.smokeId} navigator={navigator}/>
    }
    else if(route.id === 3) {
      var CommentPage = require('./appCode/components/Comments')
      return <CommentPage navigator={navigator}/>
    }
    else if(route.id === 4) {
      var ProfilePage = require('./appCode/components/profile')
      return <ProfilePage navigator={navigator}/>
    }
    else if(route.id === 5) {
      var ProfileEditPage = require('./appCode/components/ProfileEdit')
      return <ProfileEditPage navigator={navigator}/>
    }
    else if(route.id === 6) {
      var NewThreadPage = require('./appCode/components/NewThread')
      return <NewThreadPage type={route.type} navigator={navigator}/>
    }
    else if(route.id === 7) {
      var RegisterPage = require('./appCode/components/RegisterPage')
      return <RegisterPage navigator={navigator}/>
    }
    else if(route.id === 8) {
      var ApplicationHeader = require('./appCode/components/ApplicationHeader')
      return <ApplicationHeader navigator={navigator}/>
    }
    else if(route.id === 9) {
      var Interest = require('./appCode/components/Interest')
      return <Interest navigator={navigator}/>
    }
    else if(route.id === 10) {
      var SmokeSignalsList = require('./appCode/components/LiveSS')
      return <SmokeSignalsList navigator={navigator}/>
    }
    else if(route.id === 11) {
      var CloseSSList = require('./appCode/components/CloseSS')
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
