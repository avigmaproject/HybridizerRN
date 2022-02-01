import React, { Component } from "react";
import {
  Platform,
  PixelRatio,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
export default class TouchableBotton extends Component {
  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          marginBottom: 20,
          backgroundColor: this.props.backgroundColor,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          borderWidth: this.props.borderWidth,
          borderColor: this.props.borderColor,
          borderStyle: this.props.borderStyle,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: this.normalize(15),
            fontWeight: "bold",
          }}
        >
          <Text style={{ color: this.props.color }}>{this.props.title}</Text>
        </Text>
      </TouchableOpacity>
    );
  }
}
