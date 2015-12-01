//'use strict';

var React = require('react-native')

window.navigator.userAgent = 'react-native'

var socket = require('../socket')
var RCTUIManager = require('NativeModules').UIManager;
var moment = require('moment')
var SmokeStore = require('../Stores/SmokeStore')
var Reflux = require('reflux')
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
} = React

var styles = require('../styles/styles.js')
var SmokeStore = require('../Stores/SmokeStore')
var UserStore = require('../Stores/UserStore')
var { Icon, } = require('react-native-icons');
var Radio = require('./radioButton/radio-buttons.js')
var ApplicationHeader = require('./ApplicationHeader.js')
var Option = Radio.Option
var ScreenHeight = Dimensions.get('window').height
var Overlay = require('../../node_modules/react-native-modalbox/node_modules/react-native-overlay')


var Durations = [
  'Hours',
  'Minutes',
  'Seconds',
  'Days',
  'Weeks',
  'Months',
]
var Tags = ['pankaj', '42', 'hb', 'network', 'nature', 'ghoomakad']
var ThreadPage = React.createClass({
  getInitialState: function(){
    return {
      tag:'',
      title:'',
      description:'',
      optionSelected: 1,
      time:'',
      searchTags:[],
      selectedTags: ['pakaj'],
      showTimeMenu: false,
      duration: 'For Durations'
    }
  },
  componentDidMount: function() {
    socket.on('c-smokesignal-result', function(result) {
      ToastAndroid.show(result.message, ToastAndroid.SHORT) 
      this.props.navigator.push({id : 1}) 
    })
  },

  goNextPage: function(message) {
    if(message.text === 'successfull') {
      ToastAndroid.show('SmokeSignal Created', ToastAndroid.SHORT)
    }
  },
  _handleSubmit: function() {
    var smokeSignal = {
      userId: UserStore.getUserData().nick,
      id: +moment() + '_'+ Math.random(),
      type: this.props.type,
      title: this.state.title,
      tags: this.state.selectedTags.toString(),
      description: this.state.description,
      createdAt: +moment(),
      burningTill: this.state.time + ' ' + this.state.duration,
      active: true,
      thanks: 0,
      nothanks: 0,
      comments: [],
      anonymous: false,
    } 
    SmokeStore.addSmokeSignal(smokeSignal)
  },

  onSelect: function(index){
    this.setState({
      optionSelected: index + 1
    })
  },
  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  _onChangeText: function(searchTag) {
    var that = this
    this.setState({
      tag: searchTag,
    });
    var tags = Tags.filter(function(tag){
      return tag.toLowerCase().match(that.state.tag)
    }) 
    this.setState({
      searchTags: tags  
    })
  },
 

  render: function() {
    var that = this
    var navigationView = (
      <View style={[styles.DrawerView,{height: ScreenHeight}]}>
        <View style={styles.DrawerHeading}>
          <Text style={styles.DrawerHeadingText}>LifeMaker</Text>
        </View>
        <View style={styles.DrawerSmokeSignals}>
          <Icon
            name='ion|bonfire'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>SmokeSignals</Text> 
        </View>
        <View style={styles.DrawerSmokeSignals}>
          <Icon
            name='ion|person'
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
        <ApplicationHeader openDrawer={this.openDrawer} title= 'CreateSignal'/>
        <ScrollView
          style = {styles.scrollView}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.container}>
            <Text style={styles.newThreadField}>Title</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1,}}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
            /> 
            <Text style={{marginTop:20}}>Tags</Text>
            <View style={{flexDirection: 'row', marginLeft:30}}>
            { that.state.selectedTags.length && this.state.selectedTags.map(function(tag){
              return <TouchableOpacity style={[styles.tagButton,{width:  PixelRatio.getPixelSizeForLayoutSize(25)}]} onPress={that.onTag}>
                <Text style={styles.tag} ref='text'>
                  {tag}
                </Text>
              </TouchableOpacity>
            })}
            </View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1 ,}}
              onChangeText={this._onChangeText}
              value={this.state.tag}
            /> 
            <View style={{flexDirection: 'row'}}>
              { this.state.tag != '' && this.state.searchTags.map(function(val, i){
                if(i < 4) {
                  return <InterestField tag={val} getTag={that.getTag}/>               
                }
              })}
            </View>
            <Text style={styles.newThreadField}>Description</Text>
            <TextInput
              style={{height: 80, borderColor: 'gray', borderWidth: 1,}}
              onChangeText={(description) => this.setState({description})}
              multiline={true}
              value={this.state.description}
            /> 
            <View style={{flexDirection:'row'}}>
              <View>
                <Text style={styles.newThreadField}>Time</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, width:80,}}
                  onChangeText={(time) => this.setState({time})}
                  value={this.state.interests}
                  keyboardType={'numeric'}
                /> 
              </View>
              <View>
                <TouchableOpacity onPress={this.selectTime} style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>{this.state.duration}</Text>
                </TouchableOpacity>
                <View style={{borderColor: 'gray',borderWidth: 0.5}}> 
                  {this.state.showTimeMenu && Durations.map(function(val) {
                    return <TouchableOpacity style={styles.selectBox} onPress={that.selectDuration.bind(null, val)}>
                      <Text>{val}</Text>
                    </TouchableOpacity>
                  }) }
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.sendSmoke} onPress={this._handleSubmit}>
              <View>
                <Text>Send Smoke</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    )
  },
  getTag: function(tag) {
    console.log(tag)
    var that= this
    ToastAndroid.show(tag+'sadf' , ToastAndroid.SHORT)
    var newArray = this.state.selectedTags.slice();
    newArray.push(tag);
    this.setState({selectedTags: newArray})
  },
  selectDuration: function(timeInfoText , e) {
    this.setState({duration: timeInfoText, showTimeMenu: false})
  },
  selectTime: function() {
    if(!this.state.showTimeMenu) {
      this.setState({showTimeMenu: true})
    }
    else {
      this.setState({showTimeMenu: false})
    }
  },

})

var Item = React.createClass({
  render: function() {
    var { title } = this.props;

    return (
      <View style={{ paddingTop: 20, paddingLeft: 40,justifyContent: 'center',
 }}>
        <Text style={{marginLeft:-200}}>{ title }</Text>
      </View>
    )

  }

})
var InterestField = React.createClass({
  onTag: function() {
    ToastAndroid.show(this.props.tag , ToastAndroid.SHORT)
    this.props.getTag(this.props.tag)
  },

  render: function() {
    return (
       <TouchableOpacity style={[styles.tagButton,{width:  PixelRatio.getPixelSizeForLayoutSize(25)}]} onPress={this.onTag}>
        <Text style={styles.tag} ref='text'>
          {this.props.tag}
        </Text>
       </TouchableOpacity>
    )
  }
})
module.exports = ThreadPage
