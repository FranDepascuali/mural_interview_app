import React, { Component } from "react";
import Draggable from "../../Utils/Draggable";
import Selectable from "../../Utils/Selectable";

export default class WidgetView extends Component {
  render() {
    return (
      <Draggable
        origin={{ x: this.props.widget.x, y: this.props.widget.y }}
        width={this.props.widget.width}
        height={this.props.widget.height}
        onDragging={this.props.onDragging}
        onRelease={this.props.onRelease}
      >
        <Selectable
          width={this.props.widget.width}
          height={this.props.widget.height}
          origin={{ x: this.props.widget.x, y: this.props.widget.y }}
          onDeletePressed={() => this.props.onWidgetDeleted(this.props.widget)}
        >
          {this.props.children}
        </Selectable>
      </Draggable>
    );
  }
}
