import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useToast } from "native-base";
import { resetpassword } from "../../../services/api.function";
import { useDispatch } from "react-redux";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Entypo";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ResetPassword({ navigation, route }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [email, setEmail] = React.useState("");
  const [device, setdevice] = useState(0);
  const [loading, setloading] = useState(false);
  const [data, setData] = React.useState({
    secureTextEntry: true,
    secureTextEntry1: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateSecureTextEntry1 = () => {
    setData({
      ...data,
      secureTextEntry1: !data.secureTextEntry1,
    });
  };
  // https://hybridizerrn.page.link/

  const Validation = () => {
    const invalidFields = [];

    if (!password) {
      invalidFields.push("password");
      showerrorMessage("Fields can not be empty.");
    }
    if (!cpassword) {
      invalidFields.push("ErrorCPassword");
      showerrorMessage("Fields can not be empty.");
    }
    if (cpassword != password) {
      invalidFields.push("ErrorCPassword2");
      showerrorMessage("Password and confirm password does not amtch.");
    }
    return invalidFields.length > 0;
  };

  const showerrorMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: "Error",
        status: "error",
        description: message,
        placement: "top",
        status: "error",
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };

  const link = route.params.link;

  useEffect(() => {
    console.log("route.paramslink", link);
    if (Platform.OS === "android") {
      setdevice(1);
    } else {
      setdevice(2);
    }
  });
  const findemail = async () => {
    console.log("route.paramslink", link);
    const spliturl = link.split("/");
    console.log("spliturl", spliturl[4]);
    const email = spliturl[4];
    return email;
  };
  const _HandleResetPassword = async () => {
    setloading(true);
    const email = await findemail();
    if (!Validation()) {
      console.log(email);
      let data = {
        User_Email: email,
        Type: 5,
        User_Password: password,
        User_Type: 1,
      };
      console.log(data);
      await resetpassword(data)
        .then((res) => {
          console.log("res: ", JSON.stringify(res));
          setloading(false);

          Alert.alert("Change Password", "Password Changed Successfully", [
            { text: "OK", onPress: () => navigation.navigate("SignIn") },
          ]);
        })
        .catch((error) => {
          if (error.response) {
            console.log("responce_error", error.response);
            setloading(false);
          } else if (error.request) {
            setloading(false);
            console.log("request error", error.request);
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
        <View>
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
              <Text style={styles.desc}>Reset your passord !!</Text>
            </View>
            <View style={{ marginTop: 35, paddingHorizontal: 25 }}>
              <TextInput
                header="Password"
                placeholder="Enter Password"
                value={password}
                onChangeText={(password) => setpassword(password)}
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
            <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
              <TextInput
                header="Confirm Password"
                placeholder="Enter Confirm Password"
                value={cpassword}
                onChangeText={(cpassword) => setcpassword(cpassword)}
                secureTextEntry={data.secureTextEntry1 ? true : false}
              />
              <TouchableOpacity
                onPress={updateSecureTextEntry1}
                style={{
                  position: "absolute",
                  right: 40,
                  top: 40,
                  zIndex: 1,
                }}
              >
                <Icon
                  name={data.secureTextEntry1 ? "eye-with-line" : "eye"}
                  size={30}
                  color="#ACACAC"
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                backgroundColor="#30AD4A"
                text="Reset Password"
                onPress={_HandleResetPassword}
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
