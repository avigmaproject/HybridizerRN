import * as React from "react";
import { Button as PaperButton } from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const Button = ({ text, backgroundColor, onPress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        alignSelf: "center",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        borderRadius: 20,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          lineHeight: 27,
          fontWeight: "600",
          color: "#ffffff",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
