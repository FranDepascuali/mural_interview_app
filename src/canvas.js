import React, { Component } from "react";
import { AppRegistry, View, ScrollView, Text } from "react-native";
import { WidgetUI } from "./models/Widget";

export class Canvas extends Component {
  render() {
    return (
      <View>
        <ScrollView
          directionalLockEnabled={false}
          horizontal={true}
          scrollEnabled={this.props.scrollingIsEnabled}
          maximumZoomScale={2}
          minimumZoomScale={1}
          contentContainerStyle={{
            height: 2000,
            width: 3000,
            backgroundColor: "blue"
          }}
        >
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

// https://codedaily.io/tutorials/21/Pan-Responder-Inside-of-a-ScrollView
