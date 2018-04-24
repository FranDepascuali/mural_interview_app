import React, { Component } from "react";
import PopoverTooltip from "react-native-popover-tooltip";

import Canvas from "./src/Canvas/Canvas";
import ImageWidgetView from "./src/Canvas/Widgets/ImageWidgetView";
import DoubleTouchListener from "./src/Utils/DoubleTouchListener";
import Widget from "./src/Models/Widget";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      widgets: [],
      draggingWidget: false
    };
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
              <ImageWidgetView
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
