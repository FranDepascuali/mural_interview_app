import React, { Component } from "react";
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Text,
  Image
} from "react-native";

export class Widget {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class WidgetUI extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY({
      x: this.props.widget.x,
      y: this.props.widget.y
    });
    this._value = { x: this.props.widget.x, y: this.props.widget.y };
    console.log(
      "Widget being instantiated with x:" +
        this._value.x +
        " y:" +
        this._value.y
    );
    this.animatedValue.addListener(value => (this._value = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.props.callbackFromParent(true);
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y
        });
        this.animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.animatedValue.x, dy: this.animatedValue.y }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.props.callbackFromParent(false);
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start();
      }
    });
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: this.animatedValue.getTranslateTransform(),
          width: this.props.widget.width,
          height: this.props.widget.height
        }}
        {...this.panResponder.panHandlers}
      >
        <Image
          style={{
            width: this.props.widget.width,
            height: this.props.widget.height
          }}
          source={{
            uri:
              "http://lorempixel.com/" +
              this.props.widget.width +
              "/" +
              this.props.widget.height
          }}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: "#333"
  },
  text: {
    color: "#FFF",
    fontSize: 20
  }
});

// https://blog.callstack.io/react-native-animations-revisited-part-iii-41ed43d1ce2e
