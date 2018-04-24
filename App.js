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
      widgets: [...this.state.widgets, new Widget(x, y, 50, 50)]
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
              />
            );
          })};
        </DoubleTouchListener>
      </Canvas>
    );
  }
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       order: 1
//     };
//   }
//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignSelf: "stretch",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           backgroundColor: "#fff"
//         }}
//       >
//         <PopoverTooltip
//           ref="tooltip1"
//           buttonComponent={
//             <Image
//               style={{
//                 width: 50,
//                 height: 50
//               }}
//               source={{
//                 uri: "http://lorempixel.com/" + 50 + "/" + 50
//               }}
//             />
//           }
//           items={[
//             {
//               label: "Item 1",
//               onPress: () => {}
//             },
//             {
//               label: "Item 2",
//               onPress: () => {}
//             }
//           ]}
//         />
//       </View>
//     );
//   }
// }
