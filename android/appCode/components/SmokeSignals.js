var React = require('react-native')

window.navigator.userAgent = 'react-native'

var Reflux =  require('reflux')
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Icon = require('react-native-vector-icons/Ionicons');
var params = require('../../config')
var Utility = require('../utility')
var BuddhaSection = require('./BuddhaSection')

var {
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView,
  ScrollView,
  Dimensions,
  ToastAndroid,
  ProgressBar,
  Image
} = React

var styles = require('../styles/styles.js')
var SmokeStore = require('../Stores/SmokeStore')
var UserStore = require('../Stores/UserStore')
var socket = require('../socket')
var CreateSmokeSignal = require('./SmokeSignals/Create/Button')
var SmokeSignalBox = require('./SmokeSignalBox')
var screenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
var ApplicationHeader = require('./ApplicationHeader')
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})


var SmokeSignalsPage = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount: function() {

    this.listenTo(SmokeStore, this.refreshList);

  },

  refreshList: function(message) {
      this.setState({
        forAll: SmokeStore.getSmokeSignals()[0],
        forMe: SmokeStore.getSmokeSignals()[1],
        forMeCount: 'For Me | ' + SmokeStore.getCount()[0],
        forAllCount: 'For All | ' + SmokeStore.getCount()[1],
      });
      ToastAndroid.show(message.message, ToastAndroid.SHORT);
  },

  getInitialState: function() {
    return {
      forMe: SmokeStore.getInterestsMatches(),
      forAll: SmokeStore.request()[0],
      forMeCount: 'For Me | ' + SmokeStore.getCount()[0],
      forAllCount: 'For All | ' + SmokeStore.getCount()[1],
      dataSource: ds.cloneWithRows([]),
    }
  },

  _handleSubmit: function(id, e) {
    this.props.navigator.push({id : 3 , smokeId: id, openCommentBox: false})
  },

  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },

  createss: function() {
    this.props.navigator.push({id : 2,})
  },

  logout: function() {
    var that = this
    fetch(params.ipAddress + '/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nick: UserStore.getUserData.nick})
    })
    .then(function(response) {
      if(response.status === 200) {
        that.props.navigator.push({id: 8})
      }
      else if (response.status === 400) {
        ToastAndroid.show(response._bodyText, ToastAndroid.SHORT)
        return {}
      }
    }).done()
  },

  gotoProfile: function() {
    this.props.navigator.push({id: 4})
  },

  gotoSignals: function() {
    this.props.navigator.push({id: 1})
  },

  ssAction: function(params) {
    socket.emit('u-smokesignal.thanks', {thankerId: UserStore.getUserData().nick, thankeeId: params.userId, _id: params.smokeId, action: params.action, count: 1})
  },

  reply: function(id, e) {
    this.props.navigator.push({id : 3 , smokeId: id, openCommentBox: true})
  },

  handleProfilePage: function(userId) {
    if(userId === UserStore.getUserData().nick) {
      this.props.navigator.push({id : 4})
    }
    else {
      this.props.navigator.push({id : 9, userId: userId})
    }
  },

  render: function() {
    var navigationView = (
      <View style={[styles.DrawerView,{height: ScreenHeight}]}>
        <View style={styles.DrawerHeading}>
          <Text style={styles.DrawerHeadingText}>LifeMaker</Text>
        </View>
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.gotoSignals}>
          <Icon
            name='bonfire'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>SmokeSignals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.gotoProfile}>
          <Icon
            name='person'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.logout}>
          <Icon
            name='log-out'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Logout</Text>
        </TouchableOpacity>
      </View>
    )


      return (
        <DrawerLayoutAndroid
          drawerWidth={300}
          ref={'DRAWER'}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>

            <ApplicationHeader openDrawer={this.openDrawer} title="SmokeSignals" showNeeds={this.showNeeds} showOffers={this.showOffers} showGeneral={this.showGeneral} searchText={this.state.searchText} changeSearchText={this.changeSearchText} submitSearch={this.submitSearch} needs={this.state.Need} offers={this.state.Offer} general={this.state.General}/>

            <ScrollableTabView>
              <TabsView tabLabel={this.state.forMeCount}  _renderSmokeSignals={this._renderSmokeSignals} smokeSignalsData={this.state.forMe} style={styles.tabsView} style={{width: screenWidth}}/>
              <TabsView initialPage={0} tabLabel={this.state.forAllCount} _renderSmokeSignals={this._renderSmokeSignals} smokeSignalsData={this.state.forAll} style={{width: screenWidth}}/>
            </ScrollableTabView>
          <CreateSmokeSignal navigator={this.props.navigator}/>
       </DrawerLayoutAndroid>
     )
   },
    _renderSmokeSignals: function(smokeSignal) {

        var message = '';
        if(smokeSignal._source.message.length > 200) {
           message = smokeSignal._source.message.slice(0, 200) + '...'
        }

        return (
          <View style={styles.smokeSignal}>
            <SmokeSignalBox ssType= {smokeSignal._source.ssType} category={smokeSignal._source.category} onSubmit={this._handleSubmit.bind(null, smokeSignal._id)} message={message || smokeSignal._source.message}/>

            <TouchableOpacity style={styles.author} onPress={this.handleProfilePage.bind(this, smokeSignal._source.userId)}>
              <Text style={styles.author}>written by {smokeSignal._source.userId}</Text>
            </TouchableOpacity>

            <BuddhaSection item={smokeSignal} itemType='smokesignal' onPress={this.ssAction}  />

            <View style={styles.commentStyle}>
            { smokeSignal._source.comments.length === 1 &&
              <Text style={styles.comments}>{smokeSignal._source.comments.length} Comment</Text> ||
              <Text style={styles.comments}>{smokeSignal._source.comments.length} Comments</Text>
            }
            </View>

          </View>
        )
    },
});

var TabsView = React.createClass({

  count: 2,

  getInitialState: function() {
    return {
      dataSource: this.props.smokeSignalsData,
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({dataSource: nextProps.smokeSignalsData})
  },

  getMoreSignals: function() {

    SmokeStore.scrollSmokeSignals({from: this.count, size: 10, match_all: {}})
    this.count = this.count + 10

  },
  render() {
    var smokeSignals = this.state.dataSource.map(function(id){
      return SmokeStore.getSmokeSignal(id)
    })
    return (
      <ListView
        style={{width:screenWidth}}
        onEndReached={this.getMoreSignals}
        dataSource={ds.cloneWithRows(smokeSignals)}
        renderRow={this.props._renderSmokeSignals}
        pageSize={4}
      />
    )
  }
})

module.exports = SmokeSignalsPage
