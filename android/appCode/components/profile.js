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
  Image,
  Navigator,
  ToolbarAndroid,
  Dimensions,
  ToastAndroid,
} = React

var styles = require('../styles/styles.js')
var socket = require('../socket')
var CreateSmokeSignal = require('./CreateSmokeSignal')
var ScreenHeight = Dimensions.get('window').height
var ApplicationHeader =  require('./ApplicationHeader')
var UserStore = require('../Stores/UserStore')
var SmokeStore = require('../Stores/SmokeStore')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

var data = [
  { id: 1, title: "Life is strange", tags: "Life, journary", description: "If you live long enough, you ll make mistakes. But if you learn from them, you ll be a better person. It s how you handle adversity, not how it affects you. The main thing is never quit, never quit, never quit."
 },
 { id: 2,title:"I need help to learn about the Life", tags: "amazing", description: "Throughout life people will make you mad, disrespect you and     treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."},
{id: 3, title : "Do you want to learn about the Life", tags: "great", description:"Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."}
]

var ProfilePage = React.createClass({

  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows(data),
      user: UserStore.getUserData(),
      smokeSignals: SmokeStore.getSmokeSignals()
    }
    console.log(this.state.user)
  },
 
  componentDidMount: function() {
    socket.on(UserStore.getUserData(), function(results) {
      ToastAndroid.show(results.message, ToastAndroid.SHORT)
    })
  },

  profileEdit: function(){
    this.props.navigator.push({id: 5 ,})
  },

  showSmokeSignals: function(){
    this.props.navigator.push({id: 10})     
  },

  closeSmokeSignals: function() {
    this.props.navigator.push({id: 11})
  },

  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  _addNeed: function() {
    this.props.navigator.push({id : 6, type : 'Need'})
  },

  _addOffer: function() {
    this.props.navigator.push({id : 6, type : 'Offer'})
  },
      
  _addGeneral: function() {
    this.props.navigator.push({id : 6, type : 'General'})
  },

  render: function(){
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
        drawerWidth={100}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
      >
        <ApplicationHeader openDrawer={this.openDrawer} title= 'Profile'/>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style = {styles.scrollView}
        >
        <View style={styles.container}>
          <TouchableOpacity  onPress={this.profileEdit}>
            <Icon
              name='edit'
              size={25}
              color='#000000'
              style={styles.edit}
            /> 
          </TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{uri: 'http://www.caretofun.net/wp-content/uploads/2015/07/beautiful-girl-profile-caretofun.net-6.jpg'}}
            />
          </View>
          { this.state.user.name && <Text style={styles.profileText}>{this.state.user.name}</Text> }
          <Text style={styles.profileText}>{this.state.user.nick}</Text>
          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.thanksGiven.count} Thanks Givens</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.thanksReceived.count} Thanks Received</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.woods} woods</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.thanksButton}>
            <Icon
              name='plus'
              size={15}
              color='#26a69a'
              style={{width:15,height:15,marginTop:2,marginRight:5}}
           />
          <Text style={styles.profileButtonText}>{this.state.user.karma} Karma</Text>
          </TouchableOpacity>

          <Text style={styles.profileText}>{this.state.user.interests.join(', ')}</Text>
          { this.state.user.whatburnsyou !== "" && <Text style={styles.profileText}>{this.state.user.whatburnsyou}</Text>}
          <TouchableOpacity style={styles.thanksButton} onPress={this.showSmokeSignals}>
            <Text style={styles.profileButtonText}>223 Lives SmokeSignal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.thanksButton} onPress={this.closeSmokeSignals}>
            <Text style={styles.profileButtonText}>223 Close SmokeSignal</Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
         <CreateSmokeSignal _addNeed={this._addNeed} _addOffer={this._addOffer} _addGeneral={this._addGeneral}/>
      </DrawerLayoutAndroid>
    )
  },
  _renderSmokeSignals: function(smokeSignal) {
    var description = smokeSignal.description.slice(0,70) 
    return (
      <View style={styles.smokeSignal}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{smokeSignal.title}</Text>
          <TouchableOpacity>
            <Icon
              name='power'
              size={25}
              color='#000000'
              style={styles.edit}
            /> 
          </TouchableOpacity>
        </View>
        <Text style={styles.tags}>{smokeSignal.tags}</Text>
        <Text style={styles.description}>{description}.....</Text>
        <TouchableOpacity style={styles.upvoteLabel}>
          <Text style={styles.commentUpvote}>+20 woods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downvoteLabel}>
          <Text style={styles.commentDownvote}>- 5 woods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyLabel}>
          <Text style={styles.reply}>20 reply</Text>
        </TouchableOpacity>

      </View>
    )
  },

})
var SmokeSignalsList = React.createClass({
  render:function(){
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.props._renderSmokeSignals}
      />
    ) 
  }
})
var CloseSSList = React.createClass({
  render:function(){
    return (
      <View>
        <Text>Close</Text>
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.props._renderSmokeSignals}
      />
      </View>
    ) 
  }
})

module.exports = ProfilePage
