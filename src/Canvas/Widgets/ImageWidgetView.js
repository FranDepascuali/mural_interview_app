import React, { Component } from "react";
import { Image } from "react-native";
import WidgetView from "./WidgetView";

export default class ImageWidget extends Component {
  render() {
    return (
      <WidgetView {...this.props}>
        <Image
          source={{
            uri: this.props.widget.imageURL
          }}
          defaultSource={require("../../../default_image.png")}
          style={{
            height: this.props.widget.width,
            width: this.props.widget.height
          }}
        />
      </WidgetView>
    );
  }
}
