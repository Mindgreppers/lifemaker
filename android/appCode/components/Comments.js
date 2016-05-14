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
  Image,
  Navigator,
  ToolbarAndroid,
} = React

var styles = require('../styles/styles.js')
var ApplicationHeader = require('./ApplicationHeader')
var CreateSmokeSignal = require('./SmokeSignals/Create/Button')

var ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var data = [
  { tags: "Life, journary", description: "If you live long enough, you ll make mistakes. But if you learn from them, you ll be a better person. It s how you handle adversity, not how it affects you. The main thing is never quit, never quit, never quit."
 },
 {tags: "amazing", description: "Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."},
{tags: "great", description:"Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."}
, {tags: "great", description:"Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too."}
]

var CommentPage = React.createClass({

  getInitialState: function() {
    return { 
      dataSource: ds.cloneWithRows(data),
    }
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


  renderCommentBox: function(comment) {
    return (
      <View style={styles.comment}>
        <Text style={styles.description}>{comment.description}</Text>
        <Text style={styles.tags}>{comment.tags}</Text>
      </View>
    )
  },

  render: function(){
     var navigationView= ( <Text style={{margin: 10, fontSize: 15, textAlign: 'left', backgroundColor:'red'}}>I'm in the Drawer!</Text>)
    return (
      <DrawerLayoutAndroid
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <ApplicationHeader title= 'Comments'/>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentBox}
        />
        <CreateSmokeSignal _addNeed={this._addNeed} _addOffer={this._addOffer} _addGeneral={this._addGeneral}/>
      </DrawerLayoutAndroid>
    )
  }
})

module.exports = CommentPage
