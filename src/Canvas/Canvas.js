import React, { Component } from "react";
import { View, ScrollView } from "react-native";

// https://codedaily.io/tutorials/21/Pan-Responder-Inside-of-a-ScrollView
export default class Canvas extends Component {
  render() {
    return (
      <View>
        <ScrollView
          directionalLockEnabled={false}
          horizontal={true}
          bounces={false}
          scrollEnabled={this.props.scrollEnabled}
          maximumZoomScale={2}
          minimumZoomScale={1}
          contentContainerStyle={{
            height: this.props.height,
            width: this.props.width,
            backgroundColor: "blue"
          }}
        >
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}
