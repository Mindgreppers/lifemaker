/* globals XMLHttpRequest: true */
'use strict';

var React = require('react-native');
var {StyleSheet, TextInput, View, ListView, Image, Text, Dimensions, TouchableHighlight, ProgressBarAndroid} = React;

var Data = [
  'kali',
  'pankaj',
  'from',
  'sundernager'
]
  
var Autocomplete = React.createClass({

  getInitialState:function() {
   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      listViewDisplayed: false,
      pankaj:'sadf',
    };
  },

  _onChangeText: function(text) {
    var that = this
    this.setState({
      text: text,
      listViewDisplayed: true,
    });
    var topics = Data.filter(function(topic){
      return topic.toLowerCase().match(that.state.text)
    }) 
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(topics)  
    })
  },
  _renderRow: function(rowData) {
    /* jshint ignore:start */
    return (
      <TouchableHighlight
        onPress={() =>
          this._onPress(rowData)
        }
        underlayColor="#c8c7cc"
      >
        <View>
        <View style={styles.row}>
          <Text 
            style={styles.description}
            numberOfLines={1}
          >{rowData}</Text>
        </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
    /* jshint ignore:end */
  },
  _getListView: function() {
    if (this.state.text !== '' && this.state.listViewDisplayed === true) {
      /* jshint ignore:start */
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      );
    } else {
      return (
        <View style={styles.poweredContainer}>
        </View>
      );
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            ref='textInput'
            style={styles.textInput}
            onChangeText={this._onChangeText}
            autoFocus={true}
            controlled={true}
            value={this.state.text}
          />
        </View>
        {this._getListView()}
        <View>
          <Text style={{marginTop:200}}>{this.state.pankaj}</Text>
        </View>
       <View style={styles.container}>
                <TextInput
                    ref='1'
                    style={styles.input}
                    placeholder='Normal'
                    returnKeyType='next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => this._focusNextField('2')}
                />
                <TextInput
                    ref='2'
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email Address'
                    returnKeyType='next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => this._focusNextField('3')}
                />
                <TextInput
                    ref='3'
                    style={styles.input}
                    keyboardType='url'
                    placeholder='URL'
                    returnKeyType='next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => this._focusNextField('4')}
                />
                <TextInput
                    ref='4'
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Numeric'
                    blurOnSubmit={false}
                    onSubmitEditing={() => this._focusNextField('5')}
                />
                <TextInput
                    ref='5'
                    style={styles.input}
                    keyboardType='numbers-and-punctuation'
                    placeholder='Numbers & Punctuation'
                    returnKeyType='done'
                />
            </View>  
      </View>
    );
  },
  _onPress: function(data) {
    this.setState({text: data,listViewDisplayed: false,
 })
  },
  _focusNextField(nextField) {
        this.refs[nextField].focus()
  },
});
var styles = StyleSheet.create({
    container: {
    },
    textInputContainer: {
      backgroundColor: '#C9C9CE',
      height: 44,
      borderTopColor: '#7e7e7e',
      borderBottomColor: '#b5b5b5',
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
    },
    textInput: {
      backgroundColor: '#FFFFFF',
      height: 28,
      borderRadius: 5,
      paddingTop: 4.5,
      paddingBottom: 4.5,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 7.5,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 15,
    },
    poweredContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    powered: {
      marginTop: 15,
    },
    listView: {
      height: Dimensions.get('window').height - 650,
      position: 'absolute'
    },
    row: {
      padding: 13,
      height: 44,
      flexDirection: 'row',
    },
    separator: {
      height: 1,
      backgroundColor: '#c8c7cc',
    },
    description: {
    },
    loader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 20,
    },
    androidLoader: {
      marginRight: -15
    },
  });

  module.exports = Autocomplete
