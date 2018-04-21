import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
// import { SecondCounter } from "./src/canvas";
// import { SecondCounter, Counter, LotsOfGreetings } from "./src/canvas";
import { Widget, AnimationExample } from "./src/models/Widget";

class Panresponder_demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
      }
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = "0deg";

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      transform: [{ translateX }, { translateY }, { rotate }, { scale }]
    };

    return (
      // <View style={styles.container}>
      <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
        {/* <Image source={require("./assets/panresponder.png")} />
           */}
        <View style={{ width: 50, height: 50, backgroundColor: "red" }} />
      </Animated.View>
      // </View>
    );
  }
}

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

// export default class App extends Component {
//   render() {
//     return (
//       <View style={{ width: 9000, height: 6000, backgroundColor: "green" }}>
//         <Panresponder_demo />
//       </View>
//     );
//   }
// }

export default class App extends Component {
  constructor() {
    super();
    // this.state = {  };

    this.animatedValue = new Animated.Value(0);
  }

  render() {
    return (
      <Index />
      // <View style={styles.container}>
      // {/* <Panresponder_demo /> */}
      // <Index />
      // </View>
    );
  }
}

class Index extends Component {
  constructor() {
    super();
    this.state = {
      lastPressed: 0,
      toDisplay: "only one time",
      widgets: []
    };
  }

  onLastPress(event) {
    var delta = new Date().getTime() - this.state.lastPressed;

    let y = event.nativeEvent.locationY;
    let x = event.nativeEvent.locationX;

    console.log("x: " + x + " y: " + y);

    if (delta < 200) {
      this.state.widgets.push(new Widget(x, y, 200, 200));
    }

    this.setState({
      lastPressed: new Date().getTime(),
      toDisplay: "toDisplay",
      widgets: this.state.widgets
    });
  }

  // render() {
  //   return (
  //     <View>
  //       <TouchableWithoutFeedback onPress={event => this.onLastPress(event)}>
  //         <View>
  //           <Text>Double press me</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       {this.state.widgets.map(widget => {
  //         return <Panresponder_demo style={{position: 'absolute', top: widget.y, left: widget.x, right: 0, bottom: 0}} />;
  //       })};
  //     </View>
  //   );
  // }

  //     render() {
  //   return (
  //     <View>
  //       <TouchableWithoutFeedback onPress={event => this.onLastPress(event)}>
  //         <View style={{ flex: 1 }}>
  //       {/* <Text>Hello</Text> */}

  //         </View>
  //       </TouchableWithoutFeedback>
  //       <View>
  //         {this.state.widgets.map(widget => {
  //           return <Panresponder_demo style={{position: 'absolute', top: widget.y, left: widget.x, right: 0, bottom: 0}} />;
  //          })};
  //       </View>
  //    </View>
  //   );
  // }
  render() {
    return (
      <TouchableWithoutFeedback onPress={event => this.onLastPress(event)}>
        <View style={{ flex: 1, backgroundColor: "powderblue" }}>
          {this.state.widgets.map(widget => {
            return (
              <View
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "red"
                }}
              />
            );
          })};
        </View>
      </TouchableWithoutFeedback>
      /*{ {this.state.widgets.map(widget => {
          return <Panresponder_demo style={{position: 'absolute', top: widget.y, left: widget.x, right: 0, bottom: 0}} />;
          // })}; }*/
    );
  }
}
