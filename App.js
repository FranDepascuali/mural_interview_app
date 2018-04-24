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
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Widget } from "./src/models/Widget";
import { Canvas } from "./src/canvas";
import { DoubleTouchListener } from "./src/DoubleTouchListener";
import { Draggable, WidgetUI, ImageWidget, Selectable } from "./src/Draggable";

import PopoverTooltip from "react-native-popover-tooltip";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      widgets: [],
      draggingWidget: false
    };

    this.animatedValue = new Animated.Value(0);
  }

  onDragging = () => {
    this.setState({ widgets: this.state.widgets, draggingWidget: true });
  };

  onRelease = () => {
    this.setState({ widgets: this.state.widgets, draggingWidget: false });
  };

  createWidget = (x, y) => {
    this.setState({
      widgets: [
        ...this.state.widgets,
        new Widget(x, y, 50, 50, this.randomImageURI(50, 50))
      ]
    });
  };

  randomImageURI = (width, height) => {
    return "http://lorempixel.com/" + width + "/" + height;
  };

  deleteWidget = widgetToDelete => {
    const index = this.state.widgets.indexOf(widgetToDelete);
    console.log("Index: " + index);
    this.setState({
      widgets: this.state.widgets.filter(widget => widget != widgetToDelete)
    });
  };

  render() {
    return (
      <Canvas scrollingIsEnabled={!this.state.draggingWidget}>
        <DoubleTouchListener onDoubleTouch={this.createWidget}>
          {this.state.widgets.map(widget => {
            return (
              <ImageWidget
                widget={widget}
                onDragging={this.onDragging}
                onRelease={this.onRelease}
                onWidgetDeleted={this.deleteWidget}
              />
            );
          })};
        </DoubleTouchListener>
      </Canvas>
    );
  }
}
