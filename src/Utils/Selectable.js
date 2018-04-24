import React, { Component } from "react";
import PopoverTooltip from "react-native-popover-tooltip";

export default class Selectable extends Component {
  render() {
    return (
      <PopoverTooltip
        ref="tooltip1"
        buttonComponent={this.props.children}
        items={[
          {
            label: "Delete",
            onPress: () => {
              this.props.onDeletePressed();
            }
          }
        ]}
      />
    );
  }
}
