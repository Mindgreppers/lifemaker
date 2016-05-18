/**
     * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Reflux = require('reflux')
var Icon = require('react-native-vector-icons/Ionicons');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Dimensions,
} = React;

var styles = require('../styles/styles')
var UserStore = require('../Stores/UserStore')
var ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var ScreenHeight = Dimensions.get('window').height
var ScreenWidth = Dimensions.get('window').width
var socket = require('../socket')

var InterestPage = React.createClass({

  mixins: [
    Reflux.ListenerMixin
  ],

   getInitialState: function(){
    return {
      interest: '',
      interestsArray: ['hh16'],
      dataSource: ds.cloneWithRows([]),
    }
  },

  componentDidMount: function() {
    this.listenTo(UserStore, this.navigateToss)

    var that = this
    this.setState({
      dataSource : ds.cloneWithRows(this.state.interestsArray)
    })

    socket.on('u-user.error', function(err) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT)
    })

  },
  navigateToss: function() {
      this.props.navigator.push({id: 1})
  },

  onSubmitInterest: function() {
    this.state.interestsArray.push(this.state.interest)
    this.setState({
      dataSource: ds.cloneWithRows(this.state.interestsArray)
    })
    this.setState({interest : ''})
  },

  submitInterests: function() {
    var that = this
    var user = UserStore.getUserData()
    var updateUser = {
      nick: user.nick,
      interests: this.state.interestsArray
    }
    socket.emit('u-user', updateUser)

  },
  render: function() {
    return (
      <View style={[styles.container, {height: 500}]}>
        <Text style={styles.interestPageTitle}>Tell me your Interests</Text>
        <TextInput
          style={{borderColor: 'gray', borderWidth: 1}}
          onChangeText={(interest) => this.setState({interest})}
          onSubmitEditing={this.onSubmitInterest}
          value={this.state.interest}
          placeholder={'Interests....'}
        />
        <ListView
          style={styles.listViewInterests}
          dataSource={this.state.dataSource}
          renderRow={this.renderInterests}
        />
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.submitInterests}
            onPress={this.submitInterests}>
              <Text style={{color:'white'}}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },

  renderInterests: function(interest: string, sectionID: number, rowId: number) {
    var that = this
    return (
      <View style={styles.interestView}>
          <Text style={{flex:1}}>{interest}</Text>
          <TouchableOpacity style={styles.deleteInterest} onPress={() => that._pressInterest(rowId)}>
            <Icon
              name='close-round'
              size={15}
              color='#887700'
              style={styles.close}
            />
          </TouchableOpacity>
      </View>
    )
  },

  _pressInterest:function(rowId){
     this.state.interestsArray.splice(rowId, 1)
     console.log(this.state.interestsArray)
     this.setState({
        dataSource: ds.cloneWithRows(this.state.interestsArray)
     })
  },
})

module.exports = InterestPage;
