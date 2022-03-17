import React, { Component } from "react";
import { TextInput, View } from "react-native";

export default class InputField extends Component {
  render() {
    const { placeholder, onChangeText, value, onBlur, editable } = this.props;
    return (
      <View
        style={{
          backgroundColor: "#F6F6F6",
          marginVertical: 10,
          height: 40,
          paddingLeft: 10,
          // width: 300,
        }}
      >
        <TextInput
          onChangeText={onChangeText}
          style={{ height: 40 }}
          placeholder={placeholder}
          value={value}
          defaultValue={this.props.defaultValue}
          onBlur={onBlur}
          // multiline={true}
          // numberOfLines={10}
          editable={!editable}
          placeholderTextColor={"lightgray"}
        />
      </View>
    );
  }
}
