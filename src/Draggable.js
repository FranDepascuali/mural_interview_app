import React, { Component } from "react";
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Text,
  Image
} from "react-native";

// https://blog.callstack.io/react-native-animations-revisited-part-iii-41ed43d1ce2e

import PopoverTooltip from "react-native-popover-tooltip";

export class ImageWidget extends Component {
  //   render() {
  //     return (
  //       <Selectable
  //         width={this.props.widget.width}
  //         height={this.props.widget.height}
  //         origin={{ x: this.props.widget.x, y: this.props.widget.y }}
  //       >
  //         <WidgetUI {...this.props} />
  //         {/* <Image
  //             style={{
  //               width: this.props.widget.width,
  //               height: this.props.widget.height
  //             }}
  //             source={{
  //               uri: "http://lorempixel.com/" + 50 + "/" + 50
  //             }}
  //           /> */}
  //       </Selectable>
  //     );
  //   }
  //   render() {
  //     return (
  //       <Draggable
  //         origin={{ x: this.props.widget.x, y: this.props.widget.y }}
  //         width={this.props.widget.width}
  //         height={this.props.widget.height}
  //         onDragging={this.props.onDragging}
  //         onRelease={this.props.onRelease}
  //       >
  //         <Selectable
  //           width={this.props.widget.width}
  //           height={this.props.widget.height}
  //           origin={{ x: this.props.widget.x, y: this.props.widget.y }}
  //         >
  //           <View
  //             style={{
  //               width: this.props.widget.width,
  //               height: this.props.widget.height,
  //               backgroundColor: "red"
  //             }}
  //           />
  //         </Selectable>
  //       </Draggable>
  //     );
  //   }
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
        >
          <View
            style={{
              width: this.props.widget.width,
              height: this.props.widget.height,
              backgroundColor: "blue"
            }}
          />
        </Selectable>
      </Draggable>
    );
  }
  //   render() {
  //     return (
  //       <Selectable
  //         width={this.props.widget.width}
  //         height={this.props.widget.height}
  //         origin={{ x: this.props.widget.x, y: this.props.widget.y }}
  //       >
  //         <Draggable
  //           origin={{ x: this.props.widget.x, y: this.props.widget.y }}
  //           width={this.props.widget.width}
  //           height={this.props.widget.height}
  //           onDragging={this.props.onDragging}
  //           onRelease={this.props.onRelease}
  //         >
  //           {/* <View
  //             style={{
  //               width: this.props.widget.width,
  //               height: this.props.widget.height,
  //               backgroundColor: "blue"
  //             }}
  //           /> */}
  //         </Draggable>
  //       </Selectable>
  //     );
  //   }
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
      />
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
            onPress: () => {}
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
    // console.log(
    //   "_handleMoveShouldSetPanResponder dx:" +
    //     gestureState.dx +
    //     "gesture: " +
    //     gestureState +
    //     "event: " +
    //     e
    // );
    // printObject(gestureState);

    return (
      this.props.draggingEnabled &&
      (Math.abs(gestureState.dx) > 0 ||
        Math.abs(gestureState.dy) > 0 ||
        Math.abs(gestureState.vx) > 0 ||
        Math.abs(gestureState.vy) > 0)
    );
    // printObject(e.nativeEvent);

    // return Math.abs(gestureState.dx) > 5;
    // return gestureState.numberActiveTouches > 1;
    // return true;
  }

  //   _handlePanResponderMove(event, gestureState) {
  //     Animated.event([
  //       null,
  //       { dx: this.animatedValue.x, dy: this.animatedValue.y }
  //     ]);
  //   }

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
          height: this.props.height
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
        {/* <Image
          style={{
            width: this.props.width,
            height: this.props.height
          }}
          source={{
            uri:
              "http://lorempixel.com/" +
              this.props.width +
              "/" +
              this.props.height
          }}
        /> */}
      </Animated.View>
    );
  }
}
