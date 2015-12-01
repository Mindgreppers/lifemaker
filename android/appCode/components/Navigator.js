var React = require('react-native');
var {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Animated,
} = React;



var RootController = React.createClass({
  getInitialState: function(){
    return {
      bounceValue: new Animated.Value(0),
    }
  },
  render() {
    return (
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
        style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      />
   );
  },
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
});

module.exports = RootController;
