/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var React = require('react-native');
var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
} = React;

var DropDown = require('./Select/index');
var _ = require('lodash')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

var data = [
  'pankaj',
  'kali',
  'mama',
  'asdfasdf',
  'asdf',
]
var Example2 = React.createClass ({

  getInitialState: function() {
    return {
      canada: '',
      usa: '',
      text: '',
      result: '',
      dataSource: ds.cloneWithRows([]),
    }
  },

  componentDidMount: function () {
    updatePosition(this.refs['SELECT1']);

    updatePosition(this.refs['OPTIONLIST']);
  },

  _getOptionList: function() {
    return this.refs['OPTIONLIST'];
  },

  _usa: function(state) {
    this.setState({
      usa: state
    });
  },

  _canada: function(province) {


    this.setState({
      canada: province
    })

  },

  render: function() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Selected Canada's province: {this.state.canada}</Text>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Province in Canada ..."
            onSelect={this._canada.bind(this)}>
            <Option>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>

          <View style={{ height: 0 }}/>

          <OptionList ref="OPTIONLIST"/>

          <View style={{ height: 10 }}/>

         <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.onChange}
          value={this.state.text}
        /> 
          <Text>{this.state.text} {this.state.result}</Text>
      </View>
    );
  },
   
  onChange: function(text) {
    this.setState({text: text})
     var resul = data.filter(function(item) {
       return item.toLowerCase().match(text)
    }) 
        result = resul.toString()
        this.setState({dataSource: ds.cloneWithRows(resul)})
        console.log(this.state.dataSource)
        this.list()
        this.setState({result: result})
  },
  list: function() {
    if(this.props.dataSource) {
    console.log('pankaj')
      return (
          <ListView
            style={{height:100}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          /> 
      ) 
    }
  },
})
var List = React.createClass({
  render: function() {
    if(this.props.dataSource.length > 0) {
      return (
          <ListView
            style={{height:100}}
            dataSource={this.props.dataSource}
            renderRow={this._renderSmokeSignals}
          /> 
      )
    }
    else {
      return (
        <Text></Text>
      )
    }
  },
  _renderSmokeSignals: function(smoke){
    return (
      <Text>{smoke}</Text>
    )
  }
})
module.exports = Example2
