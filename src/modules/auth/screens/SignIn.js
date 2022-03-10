import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import qs from "qs";
import Spinner from "react-native-loading-spinner-overlay";
import { useToast } from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import { login } from "../../../services/api.function";
import { useDispatch } from "react-redux";
import { setToken, setLoggedIn } from "../../../store/action/auth/action";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState({
    secureTextEntry: true,
  });
  const toast = useToast();

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const Validation = () => {
    let cancel = false;
    if (email.length === 0) {
      cancel = true;
    }
    if (password.length === 0) {
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

  const warningMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: "top",
        status: "warning",
        duration: 5000,
      });
    }
  };

  const LoginUser = async () => {
    Keyboard.dismiss();
    if (Validation()) {
      setloading(true);
      let data = qs.stringify({
        username: email,
        password: password,
        clientid: 1,
        grant_type: "password",
      });
      console.log(data);
      await login(data)
        .then((res) => {
          showMessage("Login successfully");
          console.log("res: ", res);
          setloading(false);
          dispatch(setToken(res.access_token));
          dispatch(setLoggedIn(true));
        })
        .catch((error) => {
          console.log(error);
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
        <Spinner visible={loading} />

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
              <Text style={styles.desc}>
                Long time no see! Let’s login to get started
              </Text>
            </View>
            <View style={{ marginTop: 35, paddingHorizontal: 25 }}>
              <TextInput
                header="Email Address"
                placeholder="Enter Email Address"
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
              <TextInput
                header="Password"
                onChangeText={(password) => setPassword(password)}
                value={password}
                placeholder="Enter Your Password"
                secureTextEntry={data.secureTextEntry ? true : false}
              />
              <TouchableOpacity
                onPress={updateSecureTextEntry}
                style={{
                  position: "absolute",
                  right: 40,
                  top: 40,
                  zIndex: 1,
                }}
              >
                <Icon
                  name={data.secureTextEntry ? "eye-with-line" : "eye"}
                  size={30}
                  color="#ACACAC"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                marginTop: 10,
                marginRight: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forget}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                backgroundColor="#30AD4A"
                text="Sign In"
                onPress={LoginUser}
              />
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.forget}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

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
