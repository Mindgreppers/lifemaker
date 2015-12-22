var React = require('react-native')

window.navigator.userAgent = 'react-native'

var Reflux =  require('reflux')
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Icon = require('react-native-vector-icons/Ionicons');
var params = require('../../config')

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
} = React

var styles = require('../styles/styles.js')
var SmokeStore = require('../Stores/SmokeStore')
var UserStore = require('../Stores/UserStore')
var socket = require('../socket')
var CreateSmokeSignal = require('./CreateSmokeSignal')
var screenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
var ApplicationHeader = require('./ApplicationHeader')
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})


var SmokeSignalsPage = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount: function() {
    this.listenTo(SmokeStore, this.refreshList);
    console.log(this.state.forMe) 
    socket.on('r-user.' + UserStore.getUserData().nick  + '.search.done', function(data) {
      ToastAndroid.show(data.message, ToastAndroid.SHORT) 
      this.setState({
        dataSource: ds.cloneWithRows(data.results),
        showSearchResults: true
      })  
    }.bind(this))
  },

  refreshList: function() {
      this.setState({
        forAll: SmokeStore.getSmokeSignals()[0],
        forMe: SmokeStore.getSmokeSignals()[1],
        forMeCount: 'For Me | ' + SmokeStore.getCount()[0],
        forAllCount: 'For All | ' + SmokeStore.getCount()[1],
      })
  },

  getInitialState: function() {
    return {
      Need: true,
      Offer: true,
      General: true,
      forMe: SmokeStore.getInterestsMatches(),
      forAll: SmokeStore.request()[0],
      forMeCount: 'For Me | ' + SmokeStore.getCount()[0],
      forAllCount: 'For All | ' + SmokeStore.getCount()[1],
      searchResults: [],
      searchText: '',
      dataSource: ds.cloneWithRows([]),
      showSearchResults: false
    }
  },

  _handleSubmit: function(id, e) {
    this.props.navigator.push({id : 3 , smokeId: id}) 
  },

  onActionSelected: function(position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  },

  showNeeds: function() {
    if(!this.state.Need) {
      this.setState({
        Need: true,
        forAll: SmokeStore.request()
      })
    }
    else {
      this.setState({Need: false})
    }
    var forAll = this.state.forAll.filter(function(smokeSignal) {
     if(this.state[smokeSignal._source.type]) {
        return smokeSignal
     }
    }.bind(this))
    this.setState({
      forAll: forAll,
    }) 
  }, 

  showOffers: function() {
    if(!this.state.Offer) {
      this.setState({
        Offer: true,
        forAll: SmokeStore.request()
      })
    }
    else {
      this.setState({
        Offer: false,
      })
    }
    var forAll = this.state.forAll.filter(function(smokeSignal) {
     if(this.state[smokeSignal._source.type]) {
        return smokeSignal
     }
    }.bind(this))
    this.setState({
      forAll: forAll,
    }) 
  }, 

  showGeneral: function(val) {
    if(!this.state.General) {
      this.setState({
        General: true,
        forAll: SmokeStore.request()
      })
    }
    else {
      this.setState({
        General: false,
      })
    }
    var forAll = this.state.forAll.filter(function(smokeSignal) {
     if(this.state[smokeSignal._source.type]) {
        return smokeSignal
     }
    }.bind(this))
    this.setState({
      forAll: forAll,
    }) 
  }, 

  openDrawer: function(){
    this.refs['DRAWER'].openDrawer()
  },
  
  createss: function() {
    this.props.navigator.push({id : 2,})
  },

  changeSearchText: function(searchText) {
    this.setState({searchText: searchText})
  },

  submitSearch: function() {
   socket.emit('r-user.search', {userId: UserStore.getUserData().nick, searchText: this.state.searchText, from: 0, size: 10})  
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
      console.log(response)
      if(response.status === 200) {
        that.props.navigator.push({id: 7})
      }
      else if (response.status === 400) {
        ToastAndroid.show(response._bodyText, ToastAndroid.SHORT)
        return {}
      }
    }).done()
  },

  render: function() {
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
        <TouchableOpacity style={styles.DrawerSmokeSignals} onPress={this.logout}>
          <Icon
            name='log-out'
            size={25}
            color='#000000'
            style={{width:25,height:25,marginLeft:5}}
          />
          <Text style={{color:'#000000', fontSize:14,marginLeft:10,}}>Profile</Text> 
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

          { !this.state.showSearchResults ? ( 
            <ScrollableTabView>
              <TabsView tabLabel={this.state.forMeCount}  _renderSmokeSignals={this._renderSmokeSignals} smokeSignalsData={this.state.forMe} style={styles.tabsView} style={{width: screenWidth}}/>
              <TabsView initialPage={0} tabLabel={this.state.forAllCount} _renderSmokeSignals={this._renderSmokeSignals} smokeSignalsData={this.state.forAll} style={{width: screenWidth}}/>
            </ScrollableTabView>
             )
            : (
              <ListView
                style={{width:screenWidth}}
                dataSource={this.state.dataSource}
                renderRow={this._renderSmokeSignals}
              />
            )  
          }
          <CreateSmokeSignal navigator={this.props.navigator}/>
       </DrawerLayoutAndroid>
     )
   },
    _renderSmokeSignals: function(smokeSignal) {
      if(smokeSignal._source) {
        if(smokeSignal._source.description > 70) {
          var description = smokeSignal.description.slice(0,70) 
        }
        return (
          <View style={styles.smokeSignal}>
            <TouchableOpacity onPress={this._handleSubmit.bind(null, smokeSignal._id)}>
              <Text style={styles.title}>{smokeSignal._source.description}</Text>
            </TouchableOpacity>
            <Text style={styles.tags}>{smokeSignal._source.tags.toString()}</Text>
              <Text style={[styles.commentUpvote, styles.upvoteLabel]}>{smokeSignal._source.thanks} Thanks</Text>
              <Text style={[styles.commentDownvote, styles.downvoteLabel]}>{smokeSignal._source.nothanks} NoThanks</Text>
              <Text style={[styles.reply, styles.replyLabel]}>{smokeSignal._source.comments.length} Reply</Text>
          </View>
        )
      }
    },
});

var TabsView = React.createClass({
  getInitialState: function() {
    return {
      dataSource: this.props.smokeSignalsData,
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({dataSource: nextProps.smokeSignalsData})
  },
  render() {
    var smokeSignals = this.state.dataSource.map(function(id){
      return SmokeStore.getSmokeSignal(id)
    })
    console.log(this.state.dataSource)
    return (
      <ListView
        style={{width:screenWidth}}
        dataSource={ds.cloneWithRows(smokeSignals)}
        renderRow={this.props._renderSmokeSignals}
      />
    )
  }
})

module.exports = SmokeSignalsPage
