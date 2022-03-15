import React from "react";
import { View, Text, TextInput as InputText } from "react-native";

const TextInput = ({
  onChangeText,
  value,
  placeholder,
  keyboardType,
  header,
  secureTextEntry,
  editable,
  ...props
}) => {
  return (
    <View>
      <Text
        style={{
          color: "#151522",
          fontSize: 15,
          lineHeight: 20,
          fontWeight: "700",
        }}
      >
        {header}
      </Text>
      <InputText
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: "#E4E4E4",
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
          color: "#151522",
          fontSize: 13,
          lineHeight: 18,
        }}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
};
export default TextInput;
