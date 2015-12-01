'use strict';

var React = require('react-native');
var {
  Text,
  View,
  TouchableOpacity,
  Image,
  ToolbarAndroid,
  SwitchAndroid,
  TextInput,
  ToastAndroid,  
} = React

var { Icon, } = require('react-native-icons');
var styles = require('../styles/styles.js')

var ApplicationHeader = React.createClass({
  getInitialState: function(){
    return {
      showSearchBar: false,
      showTitle: true,
      showFilters: false,
    }
  },

  _onActionSelected: function(position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  },

  showSearchBar: function() {
    if (this.state.showTitle) {
      this.setState({showTitle: false})
      this.setState({showSearchBar: true})
    }  
    else if (this.state.showSearchBar && !this.state.showTitle) {
      this.setState({showTitle: true})
      this.setState({showSearchBar: false})
    }
    else {
      this.setState({showSearchBar: true})
    }
  },
  showFilters: function() {
    if(!this.state.showFilters) {
      this.setState({showFilters: true})
    }
    else {
      this.setState({showFilters: false})
    }
  },

  render: function(){
    var source = require('../img/cb_disabled.png');
    return (
      <View>
      <ToolbarAndroid
        style={{backgroundColor:'rgba(63, 159,107, 1)', height:56, color:'#000000', fontSize:10,}}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.menuButton} onPress={this.props.openDrawer}>
            <Icon
              name='ion|android-menu'
              size={20}
              color='#ffffff'
              style={styles.icon}
            /> 
          </TouchableOpacity>
          { this.state.showTitle && <View style={styles.titleView}><Text style={styles.PageTitle}>{this.props.title}</Text></View> }
          { this.state.showSearchBar && <TextInput
            style={styles.searchBar}
            onChangeText={this.props.changeSearchText}
            onSubmitEditing={this.props.submitSearch}
            placeholder={'Search'}
            value={this.props.searchText}
          />}
          <TouchableOpacity style={styles.searchButton} onPress={this.showSearchBar}>
            <Icon
              name='ion|android-search'
              size={20}
              color='#ffffff'
              style={styles.icon}
            /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon
              name='ion|android-notifications'
              size={20}
              color='#ffffff'
              style={styles.icon}
            /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton} onPress={this.showFilters}>
            <Icon
              name='ion|funnel'
              size={20}
              color='#ffffff'
              style={styles.icon}
            /> 
          </TouchableOpacity>

        </View>
      </ToolbarAndroid>
      <View style={{flexDirection: 'row'}}>
      { this.state.showFilters && !this.props.needs && 
        <TouchableOpacity onPress={this.props.showNeeds} style={styles.checkBoxButton}>
          <View style={styles.checkBoxView}>
            <Image
              style={styles.icon}
              source={require('../img/cb_disabled.png')}
            />
            <Text style={styles.checkBoxLabel}>Needs</Text>
          </View> 
        </TouchableOpacity> }
       { this.state.showFilters && this.props.needs &&
         <TouchableOpacity onPress={this.props.showNeeds} style={styles.checkBoxButton}>
            <View style={styles.checkBoxView}>
              <Image
                style={styles.icon}
                source={require('../img/cb_enabled.png')}
              /> 
              <Text style={styles.checkBoxLabel}>Needs</Text>
           </View>
         </TouchableOpacity>  }       
         { this.state.showFilters && !this.props.offers && 
        <TouchableOpacity style={styles.checkBoxButton} onPress={this.props.showOffers}>
          <View style={styles.checkBoxView}>
            <Image
              style={styles.icon}
              source={require('../img/cb_disabled.png')}
            />
            <Text style={styles.checkBoxLabel}>Offers</Text>
          </View> 
        </TouchableOpacity> }
       { this.state.showFilters && this.props.offers &&
         <TouchableOpacity onPress={this.props.showOffers} style={styles.checkBoxButton}>
            <View style={styles.checkBoxView}>
              <Image
                style={styles.icon}
                source={require('../img/cb_enabled.png')}
              /> 
              <Text style={styles.checkBoxLabel}>Offers</Text>
           </View>
         </TouchableOpacity>  } 
         { this.state.showFilters && !this.props.general && 
        <TouchableOpacity style={styles.checkBoxButton} onPress={this.props.showGeneral}>
          <View style={styles.checkBoxView}>
            <Image
              style={styles.icon}
              source={require('../img/cb_disabled.png')}
            />
            <Text style={styles.checkBoxLabel}>General</Text>
          </View> 
        </TouchableOpacity> }
       { this.state.showFilters && this.props.general &&
         <TouchableOpacity onPress={this.props.showGeneral} style={styles.checkBoxButton}>
            <View style={styles.checkBoxView}>
              <Image
                style={styles.icon}
                source={require('../img/cb_enabled.png')}
              /> 
              <Text style={styles.checkBoxLabel}>General</Text>
           </View>
         </TouchableOpacity>  } 
         </View>
        </View>
    )
  }
})

module.exports = ApplicationHeader
