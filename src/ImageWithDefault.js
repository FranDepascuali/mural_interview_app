import React, { Component } from "react";
import { Image, View, Text } from "react-native";

export class RandomImageWithDefault extends Component {
  constructor() {
    super();
    console.log("Constructor called");
  }

  componentDidMount() {
    console.log("HEYY component mounted");
  }

  shouldComponentUpdate(newProps) {
    console.log("should component update");
    return false;
  }

  render() {
    return (
      <Image
        source={{
          uri: this.props.uri
        }}
        // defaultSource={require("../default_image.png")}
        style={{
          height: this.props.width,
          width: this.props.height
        }}
        resizeMode="cover"
        resizeMethod="scale"
      />
    );
  }
}
