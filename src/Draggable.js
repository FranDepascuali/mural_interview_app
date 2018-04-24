import React, { Component } from "react";
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { RandomImageWithDefault } from "./ImageWithDefault";

// https://blog.callstack.io/react-native-animations-revisited-part-iii-41ed43d1ce2e

import PopoverTooltip from "react-native-popover-tooltip";

export class ImageWidget extends Component {
  render() {
    return (
      <WidgetUI {...this.props}>
        <RandomImageWithDefault
          width={this.props.widget.width}
          height={this.props.widget.height}
          uri={this.props.widget.imageURL}
        />
      </WidgetUI>
    );
  }
}

export class WidgetUI extends Component {
  render() {
    return (
      <Draggable
        origin={{ x: this.props.widget.x, y: this.props.widget.y }}
        width={this.props.widget.width}
        height={this.props.widget.height}
        onDragging={this.props.onDragging}
        onRelease={this.props.onRelease}
        draggingEnabled={true}
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

export class Selectable extends Component {
  render() {
    return (
      <PopoverTooltip
        ref="tooltip1"
        buttonComponent={this.props.children}
        items={[
          {
            label: "Delete",
            onPress: () => {
              this.props.onDeletePressed();
            }
          }
        ]}
      />
    );
  }
}

function printObject(o) {
  var out = "";
  for (var p in o) {
    out += "\n" + ":: " + p + "(" + typeof o[p] + ") ::" + "\n" + o[p] + "\n";
  }
  console.log(out);
}

export class Draggable extends Component {
  _handleStartShouldSetPanResponder(e, gestureState) {
    console.log("_handleStartShouldSetPanResponder");
    return false;
  }

  _handleMoveShouldSetPanResponder(e, gestureState) {
    return (
      this.props.draggingEnabled &&
      (Math.abs(gestureState.dx) > 0 ||
        Math.abs(gestureState.dy) > 0 ||
        Math.abs(gestureState.vx) > 0 ||
        Math.abs(gestureState.vy) > 0)
    );
  }

  _handlePanResponderMove = (event, gestureState) => {
    Animated.event([
      null,
      { dx: this.animatedValue.x, dy: this.animatedValue.y }
    ])(event, gestureState);
  };

  _handlePanResponderEnd(e, gestureState) {
    console.log("_handlePanResponderEnd");
    this.props.onRelease();
    this.animatedValue.flattenOffset();
    Animated.decay(this.animatedValue, {
      deceleration: 0.997,
      velocity: { x: gestureState.vx, y: gestureState.vy }
    }).start();
  }

  _handleOnPanResponderGrant(e, gestureState) {
    console.log("_handlePanResponderGrant");
    this.props.onDragging();
    this.animatedValue.setOffset({
      x: this._value.x,
      y: this._value.y
    });
    this.animatedValue.setValue({ x: 0, y: 0 });
  }

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.ValueXY({
      x: this.props.origin.x,
      y: this.props.origin.y
    });
    this._value = { x: this.props.origin.x, y: this.props.origin.y };
    this.animatedValue.addListener(value => (this._value = value));
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(
        this
      ),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(
        this
      ),
      onPanResponderGrant: this._handleOnPanResponderGrant.bind(this),
      // - The user is moving their finger
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this)
    });
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: this.animatedValue.getTranslateTransform(),
          width: this.props.width,
          height: this.props.height,
          position: "absolute"
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
