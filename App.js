import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from "react-native";
// import { SecondCounter } from "./src/canvas";
// import { SecondCounter, Counter, LotsOfGreetings } from "./src/canvas";
import { Widget } from "./src/models/Widget";
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
      widgets: []
    };

    this.animatedValue = new Animated.Value(0);
  }

  render() {
    // return <Canvas />;
    return (
      <View style={{ flex: 1, backgroundColor: "green" }}>
        <DoubleTouchListener
          onDoubleTouch={(x, y) =>
            this.setState({
              widgets: [...this.state.widgets, new Widget(x, y, 50, 50)]
            })
          }
        />
        {this.state.widgets.map(widget => {
          return (
            <View
              style={{
                position: "absolute",
                top: widget.y,
                left: widget.x,
                width: widget.width,
                height: widget.height,
                backgroundColor: "red"
              }}
            />
          );
        })};
      </View>
    );
  }
}

// render() {
//   return (
//     <TouchableWithoutFeedback onPress={event => this.onLastPress(event)}>
//       <View style={{ flex: 1, backgroundColor: "powderblue" }}>
//         {this.state.widgets.map(widget => {
//           return (
//             <View
//               style={{
//                 position: "absolute",
//                 top: widget.y,
//                 left: widget.x,
//                 width: widget.width,
//                 height: widget.height,
//                 backgroundColor: "red"
//               }}
//             />
//           );
//         })};
//       </View>
//     </TouchableWithoutFeedback>
//     /*{ {this.state.widgets.map(widget => {
//         return <Panresponder_demo style={{position: 'absolute', top: widget.y, left: widget.x, right: 0, bottom: 0}} />;
//         // })}; }*/
//   );
// }

// class DoubleTouchListener extends Component {
//   constructor() {
//     super();
//     this.state = {
//       lastPressed: 0,
//       widgets: []
//     };
//   }

//   onLastPress(event) {
//     var delta = new Date().getTime() - this.state.lastPressed;

//     let y = event.nativeEvent.locationY;
//     let x = event.nativeEvent.locationX;

//     console.log("x: " + x + " y: " + y);

//     shouldAddWidget = delta < 200;

//     widgets = this.state.widgets;

//     if (shouldAddWidget) {
//       widgets.push(new Widget(x, y, 200, 200));
//     }

//     this.setState({
//       lastPressed: new Date().getTime(),
//       widgets: widgets
//     });
//   }

//   render() {
//     return <Canvas />;
//   }
// }
