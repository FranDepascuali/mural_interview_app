import React, { Component } from "react";
import PopoverTooltip from "react-native-popover-tooltip";

import Canvas from "./src/Canvas/Canvas";
import ImageWidgetView from "./src/Canvas/Widgets/ImageWidgetView";
import DoubleTouchListener from "./src/Utils/DoubleTouchListener";
import Widget from "./src/Models/Widget";

let DEFAULT_IMAGE_SIZE = { width: 200, height: 200 };
let CANVAS_SIZE = { width: 3000, height: 2000 };

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      widgets: [],
      // NOTE: We need to know if a widget is being dragged because we want to stop dragging the canvas for that case.
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
        new Widget(
          x,
          y,
          DEFAULT_IMAGE_SIZE.width,
          DEFAULT_IMAGE_SIZE.height,
          randomImageURI(DEFAULT_IMAGE_SIZE.width, DEFAULT_IMAGE_SIZE.height)
        )
      ]
    });
  };

  deleteWidget = widgetToDelete => {
    const index = this.state.widgets.indexOf(widgetToDelete);
    console.log("Index: " + index);
    this.setState({
      widgets: this.state.widgets.filter(widget => widget !== widgetToDelete)
    });
  };

  render() {
    return (
      <Canvas
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        scrollEnabled={!this.state.draggingWidget}
      >
        <DoubleTouchListener onDoubleTouch={this.createWidget}>
          {this.state.widgets.map(widget => {
            return (
              <ImageWidgetView
                key={widget.x.toString() + widget.y.toString()}
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

randomImageURI = (width, height) => {
  return "http://lorempixel.com/" + width + "/" + height;
};
