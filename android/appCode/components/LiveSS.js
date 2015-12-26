'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView,
  ScrollView,
  ToolbarAndroid,
  Dimensions,
} = React

var socket = require('../socket')
var styles = require('../styles/styles.js')
var CreateSmokeSignal = require('./CreateSmokeSignal')
var SideBar = require('./SideBar')
var ApplicationHeader =  require('./ApplicationHeader')
var ScreenHeight = Dimensions.get('window').height
var UserStore = require('../Stores/UserStore')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

var SmokeSignalsList = React.createClass({
  
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([]),
    }
  },

  componentDidMount: function() {
      
    var that = this
    socket.emit('r-userss', {nick: this.props.userId, active: true})

    socket.on('r-userss.done', function(result) {


      that.setState({
        dataSource: ds.cloneWithRows(result.message)   
      }) 

    })

  },
 
  closeSignal: function(smokeId) {
    socket.emit('u-smokesignal', {_id: smokeId, active: false})  
  },

  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  render:function(){

    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => <SideBar navigator={this.props.navigator}/>}
      >
        <ApplicationHeader openDrawer={this.openDrawer} title= 'LivesSignals'/>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style = {styles.scrollView}
        >
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderSmokeSignals}
          />
        </ScrollView>
        <CreateSmokeSignal navigator={this.props.navigator}/>
      </DrawerLayoutAndroid>
    ) 
  },
  _renderSmokeSignals: function(smokeSignal) {
        console.log(smokeSignal)
        if(smokeSignal._source.description > 70) {
          var description = smokeSignal.description.slice(0,70) 
        }
        return (
          <View style={styles.smokeSignal}>
            <View style={styles.liveSS}>
              <TouchableOpacity style={styles.liveSSTitle}>
                <Text style={styles.description}>{smokeSignal._source.message}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.closeSignal.bind(this, smokeSignal._id)}>
                <Icon
                  name='power'
                  size={25}
                  color='#26a69a'
                  style={{width:25,height:25,marginLeft:5}}
                />
              </TouchableOpacity>
            </View>
              <Text style={[styles.commentUpvote, styles.upvoteLabel]}>{smokeSignal._source.thanks} Thanks</Text>
              <Text style={[styles.commentDownvote, styles.downvoteLabel]}>{smokeSignal._source.nothanks} NoThanks</Text>
              <Text style={[styles.reply, styles.replyLabel]}>{smokeSignal._source.comments.length} Reply</Text>
          </View>
        )
    },


})

module.exports = SmokeSignalsList
