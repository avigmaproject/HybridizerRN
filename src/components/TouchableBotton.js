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
          marginBottom: this.props.marginBottom ? 0 : 20,
          backgroundColor: this.props.backgroundColor,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: this.props.height,
          borderWidth: this.props.borderWidth,
          borderColor: this.props.borderColor,
          borderStyle: this.props.borderStyle,
          paddingHorizontal: 5,
        }}
      >
        <Text
          ellipsizeMode={"tail"}
          numberOfLines={2}
          style={{
            alignSelf: "center",
            // color: "black",
            fontSize: this.props.font ? this.normalize(15) : this.normalize(10),
            fontWeight: "bold",
            color: this.props.color,
          }}
        >
          {/* <Text style={{ }}> */}
          {this.props.title}
          {/* </Text> */}
        </Text>
      </TouchableOpacity>
    );
  }
}
