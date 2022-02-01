import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Keyboard,
} from "react-native";
import qs from "qs";
import Spinner from "react-native-loading-spinner-overlay";
import { useToast } from "native-base";
import { login } from "../../../services/api.function";
import { useDispatch } from "react-redux";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const toast = useToast();

  const Validation = () => {
    let cancel = false;
    if (email.length === 0) {
      cancel = true;
    }
    if (cancel) {
      showerrorMessage("Fields can not be empty");
      return false;
    } else {
      return true;
    }
  };

  const showerrorMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: "Invalid email address",
        status: "error",
        description: message,
        placement: "top",
        status: "error",
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };

  const showMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: "top",
        status: "success",
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };

  const _HandleForgotPAssword = async () => {
    Keyboard.dismiss();
    if (Validation()) {
      setloading(true);
      let data = qs.stringify({
        username: email,
      });
      console.log(data);
      await login(data)
        .then((res) => {
          showMessage("Link send successfully.");
        })
        .catch((error) => {
          setloading(false);
          if (
            error.response.data.error_description ===
            "The UserCode or password is incorrect."
          ) {
            showerrorMessage("username or password is incorrect");
          } else {
            showerrorMessage(error.response.data.error_description);
          }
        });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#fff", height: "100%" }}
      >
        <View style={{}}>
          <View>
            <Image
              resizeMode="stretch"
              source={require("../assets/Rectangle.png")}
              style={{ width: "100%" }}
            />
          </View>
          <Animatable.View animation={"fadeInUpBig"} style={styles.card}>
            <View style={{ marginTop: 25, paddingHorizontal: 25 }}>
              <Text style={styles.welcometext}>Welcome Back!</Text>
              <Text style={styles.desc}>Forgot your passord !!</Text>
            </View>
            <View style={{ marginTop: 35, paddingHorizontal: 25 }}>
              <TextInput
                header="Email Address"
                placeholder="Enter Email Address"
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                backgroundColor="#30AD4A"
                text="Forgot Password"
                onPress={_HandleForgotPAssword}
              />
            </View>
          </Animatable.View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  rectangle: {
    width: windowWidth,
    height: windowHeight / 2.5,
  },
  card: {
    width: windowWidth,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingBottom: 10,
  },
  welcometext: {
    color: "#151522",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    // fontFamily: 'Roboto',
  },
  desc: {
    color: "#999999",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "300",
    top: 10,
  },
  forget: {
    color: "#388AF0",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
  },
});
