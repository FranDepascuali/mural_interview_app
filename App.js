import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions
} from "react-native";
// import { SecondCounter } from "./src/canvas";
// import { SecondCounter, Counter, LotsOfGreetings } from "./src/canvas";
import { Widget, WidgetUI } from "./src/models/Widget";
import { Canvas } from "./src/canvas";
import { DoubleTouchListener } from "./src/DoubleTouchListener";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "black",
    marginBottom: 5
  }
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      widgets: [],
      dragging: false
    };

    this.animatedValue = new Animated.Value(0);
  }

  myCallback = dragging => {
    this.setState({ widgets: this.state.widgets, dragging: dragging });
  };

  render() {
    return (
      <Canvas scrollingIsEnabled={!this.state.dragging}>
        <DoubleTouchListener
          onDoubleTouch={(x, y) =>
            this.setState({
              widgets: [...this.state.widgets, new Widget(x, y, 50, 50)]
            })
          }
        >
          {this.state.widgets.map(widget => {
            return (
              <WidgetUI widget={widget} callbackFromParent={this.myCallback} />
            );
          })};
        </DoubleTouchListener>
      </Canvas>
    );
  }
}
