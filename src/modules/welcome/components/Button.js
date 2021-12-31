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
  Image,
} from "react-native";

const Button = ({
  borderColor,
  borderWidth,
  backgroundColor,
  text,
  image,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        alignSelf: "center",
        height: 56,
        alignItems: "center",
        borderWidth: borderWidth ? 1 : 0,
        borderColor: "lightgray",
        backgroundColor: backgroundColor ? backgroundColor : "#F1F6FB",
        borderRadius: 8,
        flexDirection: "row",
        marginTop: 10,
      }}
      onPress={props.onPress}
    >
      <View
        style={{
          width: "15%",
          // backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={image} />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "pink",
          width: "84%",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            lineHeight: 21,
            fontWeight: "500",
            color: "#2E3E5C",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
