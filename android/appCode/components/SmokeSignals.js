//'use strict';

var React = require('react-native')

window.navigator.userAgent = 'react-native'

var Reflux =  require('reflux')
var connect =  require('../socket')

var SmokeStore = require('../Stores/SmokeStore')
var UserStore = require('../Stores/UserStore')
var socket = require('../socket')
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
  Dimensions,
  ToolbarAndroid,
  ToastAndroid,
  ProgressBar,
} = React

var styles = require('../styles/styles.js')
var { Icon, } = require('react-native-icons');
var CreateSmokeSignal = require('./CreateSmokeSignal')
var screenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
var ScrollableTabView = require('./index');
var ApplicationHeader = require('./ApplicationHeader')
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})


var SmokeSignalsPage = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount: function() {
    this.listenTo(SmokeStore, this.refreshList);
    
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
        smokeSignals: SmokeStore.getSmokeSignals()[0],
        interestsMatches: SmokeStore.getSmokeSignals()[1]
      })
  },

  getInitialState: function() {
    return {
      Need: true,
      Offer: true,
      General: true,
      interestsMatches: SmokeStore.getInterestsMatches(),
      smokeSignals: SmokeStore.request(),
      searchResults: [],
      searchText: '',
      dataSource: ds.cloneWithRows([]),
      showSearchResults: false
    }
  },

  _handleSubmit: function(id, e) {
    this.props.navigator.push({id : 2 , smokeId: id}) 
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
        smokeSignals: SmokeStore.request()
      })
    }
    else {
      this.setState({Need: false})
    }
    var smokeSignals = this.state.smokeSignals.filter(function(smokeSignal) {
     if(this.state[smokeSignal._source.type]) {
        return smokeSignal
     }
    }.bind(this))
    this.setState({
      smokeSignals: smokeSignals,
    }) 
  }, 

  showOffers: function() {
    if(!this.state.Offer) {
      this.setState({
        Offer: true,
        smokeSignals: SmokeStore.request()
      })
    }
    else {
      this.setState({
        Offer: false,
      })
    }
    var smokeSignals = this.state.smokeSignals.filter(function(smokeSignal) {
     if(this.state[smokeSignal._source.type]) {
        return smokeSignal
     }
    }.bind(this))
    this.setState({
      smokeSignals: smokeSignals,
    }) 
  }, 

  showGeneral: function(val) {
    if(!this.state.General) {
      this.setState({
        General: true,
        smokeSignals: SmokeStore.request()
      })
    }
    else {
      this.setState({
        General: false,
      })
    }
    var smokeSignals = this.state.smokeSignals.filter(function(smokeSignal) {
     if(this.state[smokeSignal._source.type]) {
        return smokeSignal
     }
    }.bind(this))
    this.setState({
      smokeSignals: smokeSignals,
    }) 
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

  changeSearchText: function(searchText) {
    this.setState({searchText: searchText})
  },

  submitSearch: function() {
   socket.emit('r-user.search', {userId: UserStore.getUserData().nick, searchText: this.state.searchText, from: 0, size: 10})  
  },

  render: function() {
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

            <ApplicationHeader openDrawer={this.openDrawer} title="SmokeSignals" showNeeds={this.showNeeds} showOffers={this.showOffers} showGeneral={this.showGeneral} searchText={this.state.searchText} changeSearchText={this.changeSearchText} submitSearch={this.submitSearch} needs={this.state.Need} offers={this.state.Offer} general={this.state.General}/>

          { !this.state.showSearchResults ? ( 
            <ScrollableTabView>
              <TabsView tabLabel="For Me"  _renderSmokeSignals={this._renderSmokeSignals} smokeSignalsData={this.state.interestsMatches} style={styles.tabsView} style={{width: screenWidth}}/>
              <TabsView initialPage={0} tabLabel="For All" _renderSmokeSignals={this._renderSmokeSignals} smokeSignalsData={this.state.smokeSignals} style={{width: screenWidth}}/>
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
          <CreateSmokeSignal _addNeed={this._addNeed} _addOffer={this._addOffer} _addGeneral={this._addGeneral}/>
       </DrawerLayoutAndroid>
     )
   },
    _renderSmokeSignals: function(smokeSignal) {
      if(smokeSignal._source.description > 70) {
        var description = smokeSignal.description.slice(0,70) 
      }
      return (
        <View style={styles.smokeSignal}>
          <TouchableOpacity onPress={this._handleSubmit.bind(null, smokeSignal._id)}>
            <Text style={styles.title}>{smokeSignal._source.title}</Text>
          </TouchableOpacity>
          <Text style={styles.tags}>{smokeSignal._source.tags}</Text>
          <TouchableOpacity>
            <Text style={styles.description}>{description || smokeSignal._source.description}.....</Text>
          </TouchableOpacity>
            <Text style={[styles.commentUpvote, styles.upvoteLabel]}>{smokeSignal._source.thanks} Thanks</Text>
            <Text style={[styles.commentDownvote, styles.downvoteLabel]}>{smokeSignal._source.nothanks} NoThanks</Text>
            <Text style={[styles.reply, styles.replyLabel]}>{smokeSignal._source.comments.length} Reply</Text>
        </View>
      )
    },
});

var TabsView = React.createClass({
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([]),
    }
  },

  componentDidMount: function() {
    this.setState({
      dataSource: ds.cloneWithRows(this.props.smokeSignalsData),
    })  
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({dataSource: ds.cloneWithRows(nextProps.smokeSignalsData)})
  },
  render() {
    return (
      <ListView
        style={{width:screenWidth}}
        dataSource={this.state.dataSource}
        renderRow={this.props._renderSmokeSignals}
      />
    )
  }
})

module.exports = SmokeSignalsPage
