import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

export class DoubleTouchListener extends Component {
  constructor() {
    super();
    this.state = {
      lastPressed: 0
    };
  }

  onLastPress(event) {
    var delta = new Date().getTime() - this.state.lastPressed;

    let y = event.nativeEvent.locationY;
    let x = event.nativeEvent.locationX;

    console.log("x: " + x + " y: " + y);

    doubleTouchDetected = delta < 200;

    if (doubleTouchDetected) {
      console.log("Double touch");
      this.props.onDoubleTouch(x, y);
    }

    this.setState({
      lastPressed: new Date().getTime()
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={event => this.onLastPress(event)}>
        <View style={{ flex: 1, backgroundColor: "green" }} />
      </TouchableWithoutFeedback>
    );
  }
}
