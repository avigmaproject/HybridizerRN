import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
export default class ViewButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onpress}
        style={{
          backgroundColor: "rgba(218, 230, 228, 0.2)",
          flexDirection: "row",
          alignItems: "center",
          height: 90,
          width: "100%",
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "lightgray",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ width: "30%" }}>
          <Image
            resizeMode="stretch"
            style={{ width: "100%", height: "85%" }}
            source={this.props.source}
          />
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: "#30AD4A",
              fontWeight: "bold",
            }}
          >
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
