import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

export default class DoubleTouchListener extends Component {
  constructor() {
    super();
    this.state = {
      lastPressed: 0
    };
  }

  onLastPress = event => {
    var delta = new Date().getTime() - this.state.lastPressed;

    // Note: 200ms is an approximate of the delay between two touches.
    doubleTouchDetected = delta < 200;
    if (doubleTouchDetected) {
      this.props.onDoubleTouch(
        event.nativeEvent.locationX,
        event.nativeEvent.locationY
      );
    }

    this.setState({
      lastPressed: new Date().getTime()
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onLastPress}>
        <View
          style={{
            flex: 1,
            backgroundColor: "green"
          }}
        >
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
