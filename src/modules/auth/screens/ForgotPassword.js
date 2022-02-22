import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import qs from "qs";
import Spinner from "react-native-loading-spinner-overlay";
import { useToast } from "native-base";
import { login, forgotpassword } from "../../../services/api.function";
import { useDispatch } from "react-redux";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import dynamicLinks from "@react-native-firebase/dynamic-links";
import firebase from "@react-native-firebase/app";

export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [device, setdevice] = useState(0);
  const [loading, setloading] = useState(false);
  // https://hybridizerrn.page.link/
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
  const generateLink = async (email) => {
    setloading(true);
    const link = await dynamicLinks().buildShortLink(
      {
        link: `https://hybridizerrn.page.link/forgotpassword/${email}`,
        domainUriPrefix: "https://hybridizerrn.page.link",
        ios: {
          bundleId: "com.avigma.communv",
          appStoreId: "1608356127",
          fallbackUrl:
            "https://apps.apple.com/us/app/com.gridmaster/id1608356127",
        },
        android: {
          packageName: "com.hybridizerrn",
          fallbackUrl:
            "https://play.google.com/store/apps/details?id=com.hybridizerrn",
        },
        navigation: {
          forcedRedirectEnabled: true,
        },
      },
      firebase.dynamicLinks.ShortLinkType.UNGUESSABLE
    );
    setloading(false);
    return link;
  };
  useEffect(() => {
    if (Platform.OS === "android") {
      setdevice(1);
    } else {
      setdevice(2);
    }
  });

  const _HandleForgotPAssword = async () => {
    setloading(true);
    const link = await generateLink(email);
    if (Validation()) {
      setloading(true);
      let data = {
        EmailID: email,
        Type: 1,
        Email_Url: link,
        Device: device,
      };
      console.log(data);
      await forgotpassword(data)
        .then((res) => {
          console.log("res: ", JSON.stringify(res));
          console.log("res:123", res[0].UserCode);
          if (res[0].UserCode === "Sucesss") {
            Alert.alert(
              "Forgot Password",
              "Link sent successfully.Please check your registered email.",
              [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
            );
          }
          if (res[0].UserCode === "Error") {
            Alert.alert("Forgot Password", "Please check your email.", [
              {
                text: "OK",
                onPress: () => navigation.navigate("ForgotPassword"),
              },
            ]);
          }
          setloading(false);
        })
        .catch((error) => {
          if (error.response) {
            setloading(false);
            console.log("responce_error", error.response);
          } else if (error.request) {
            setloading(false);
            console.log("request error", error.request);
          }
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
