import React, { Component } from "react";
import { AppRegistry, View, ScrollView, Text } from "react-native";

export class Canvas extends Component {
  render() {
    return (
      <View>
        <ScrollView
          contentContainerStyle={{ height: 1000, backgroundColor: "red" }}
        >
          <ScrollView
            horizontal
            minimumZoomScale={1}
            maximumZoomScale={2}
            contentContainerStyle={{ width: 1000, backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
            <Text style={{ fontSize: 96 }}>If you like</Text>
          </ScrollView>
        </ScrollView>;
      </View>
    );
  }
}
