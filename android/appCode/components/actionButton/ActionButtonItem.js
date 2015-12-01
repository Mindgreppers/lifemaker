'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} = React;


let actionBtnWidth = 0;

class ActionButtonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceBetween: 15,
      offsetTop: props.size > 42 ? 10 : 10,
    };

    if (!props.children || Array.isArray(props.children)) throw new Error("ActionButtonItem must have a Child component.");

    if(this.props.size > 0) actionBtnWidth = this.props.size;
  }

  render() {
    return (
      <View>
      <Animated.View style={
        [
          styles.actionButtonWrap,
          {
            marginBottom: this.props.spacing,
            opacity: this.props.anim,
            transform: [
              {
                translateY: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                  extrapolate: 'clamp'
                }),
              },
            ],
          }
        ]
      }>
        <TouchableOpacity style={{flex:1}} onPress={this.props.onPress}>
          <View style={[styles.actionButton, this.props.style, 
            { 
              width: 46, 
              height: 46, 
              borderRadius: 46/2,  
              backgroundColor: this.props.buttonColor || 'white',
            }
          ]}>
            {this.props.children}
          </View>
        </TouchableOpacity>
       </Animated.View>
        <View style={this.getTextStyles()}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </View>
       </View>
    );
  }

  getTextStyles() {
    let positionStyles = { 
      right: actionBtnWidth + this.state.spaceBetween, 
      top: this.state.offsetTop 
    }
    
    if (this.props.position == 'left') positionStyles = { 
      left: actionBtnWidth + this.state.spaceBetween, 
      top: this.state.offsetTop 
    }

    return [styles.actionTextView, positionStyles]
  }
}

var styles = StyleSheet.create({
  actionButtonWrap: {
    alignItems: 'center',
  },
  arrow: {
    width: 0,
	  height: 0, 
	  borderTopWidth: 5,
	  borderBottomWidth: 5,
	  borderLeftWidth: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0, height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
  },
  actionText: {
    color: '#444',
    fontSize: 14,
  },
  actionTextView: {
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0, height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
  },
});

module.exports = ActionButtonItem;
