'use strict';

var React = require('react-native');

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
} = React

var styles = require('../styles/styles.js')
var { Icon, } = require('react-native-icons');
var CreateSmokeSignal = require('./CreateSmokeSignal')
var ApplicationHeader =  require('./ApplicationHeader')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

var data = [
  { id: 1, title: "Life is strange", tags: "Life, journary", description: "If you live long enough, you ll make mistakes. But if you learn from them, you ll be a better person. It s how you handle adversity, not how it affects you. The main thing is never quit, never quit, never quit."
 },
 { id: 2,title:"I need help to learn about the Life", tags: "amazing", description: "Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."},
{id: 3, title : "Do you want to learn about the Life", tags: "great", description:"Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."}
]

var SmokeSignalsList = React.createClass({
  
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows(data),
    }
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

  render:function(){
    var navigationView = (<Text>Hiii I am Pankaj</Text>)
    return (
      <DrawerLayoutAndroid
          drawerWidth={100}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
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
        <CreateSmokeSignal _addNeed={this._addNeed} _addOffer={this._addOffer} _addGeneral={this._addGeneral}/>
      </DrawerLayoutAndroid>
    ) 
  },
  _renderSmokeSignals: function(smokeSignal) {
    var description = smokeSignal.description.slice(0,70) 
    return (
      <View style={styles.smokeSignal}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.title, {width: 250}]}>{smokeSignal.title}</Text>
          <TouchableOpacity>
            <Icon
              name='ion|power'
              size={20}
              color='#26a69a'
              style={{width: 20, height: 20, marginLeft:10, marginTop:3}}
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

module.exports = SmokeSignalsList
