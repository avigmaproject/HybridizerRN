import React, { useState, useEffect } from "react";
import {
  View,
  AppState,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Button from "./components/Button";
import qs from "qs";
import { setToken, setLoggedIn } from "../../store/action/auth/action";
import { login } from "../../services/api.function";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import firebase from "@react-native-firebase/app";
const screenHeight = Dimensions.get("window").height;

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();
  const [appStates, setappStates] = useState("active");

  useFocusEffect(
    React.useCallback(() => {
      GoogleSignin.configure({
        webClientId:
          "263229200785-ivvh14i7k1jrqetds71nuvcni0vab5aj.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      });
    }, [])
  );

  const _getInitialUrl = async () => {
    const url = dynamicLinks().onLink(handleDynamicLink);
  };
  const _handleAppStateChange = async (nextAppState) => {
    if (appStates.match(/inactive|background/) && nextAppState === "active") {
      _getInitialUrl();
    }
    setappStates(appStates);
  };
  const handleDynamicLink = (link) => {
    if (link.url) {
      const email_link = link.url;
      if (email_link.includes("forgotpassword")) {
        navigation.navigate("ResetPassword", { link: email_link });
      }
    }
  };
  const _getDynamicLink = async () => {
    await dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          console.log("Loginlinkinside if", link.url);
          const email_link = link.url;
          if (email_link.includes("forgotpassword")) {
            navigation.navigate("ResetPassword", { link: link.url });
          }
        }
      });
  };
  useEffect(() => {
    _getInitialUrl();
    AppState.addEventListener("change", _handleAppStateChange);
    _getDynamicLink();
  });

  const initUser = async (token) => {
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=" +
        token
    )
      .then((response) => response.json())
      .then(async (json) => {
        console.log("*******jsonfb********", json);
        let data = qs.stringify({
          grant_type: "password",
          username: json.email,
          password: "",
          ClientId: 5,
          FirstName: "hybridizer",
          Role: 2,
          User_Login_Type: 3,
          User_Token_val: token,
        });
        // console.log("hiiiii", data);
        login(data).then((res) => {
          if (res) {
            dispatch(setToken(res.access_token));
            dispatch(setLoggedIn(true));
          }
        });
      })
      .catch((e) => {
        Promise.reject("ERROR GETTING DATA FROM FACEBOOK", e);
      });
  };
  const onFBButtonPress = () => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile", "email"])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error("The user cancelled the request"));
        }

        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        initUser(data.accessToken);
      })
      .catch((error) => {
        const { code, message } = error;
        // console.log(JSON.stringify(error));
        alert(message);
        console.log(`Facebook login fail with error: ${message} code: ${code}`);
        if (code === "auth/account-exists-with-different-credential") {
          Alert.alert(" Login Error! ", `${message}`, [{ text: "Ok" }], {
            cancelable: false,
          });
        }
      });
  };

  const onGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log("userInfoGoogleSignin", userInfo);
      console.log("idToken", userInfo.idToken);
      let data = qs.stringify({
        grant_type: "password",
        username: userInfo.user.email,
        password: "",
        ClientId: 5,
        FirstName: "hybridizer",
        Role: 2,
        User_Login_Type: 2,
        User_Token_val: userInfo.idToken,
      });
      login(data).then((res) => {
        if (res) {
          dispatch(setToken(res.access_token));
          dispatch(setLoggedIn(true));
        }
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        alert(error);
        console.log(JSON.stringify(error));
      }
    }
  };

  return (
    // <SafeAreaView>
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#fff",
        height: screenHeight + 200,
      }}
    >
      <View style={{ marginBottom: 100 }}>
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="cover"
            source={require("../../assets/Rectangle.png")}
            style={{ width: "100%", height: 370 }}
          />
          <Animatable.View animation={"bounceInDown"} style={styles.circle}>
            <Image
              resizeMode="stretch"
              source={require("../../assets/logo.png")}
              style={{ width: "75%", height: "60%" }}
            />
          </Animatable.View>
        </View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={styles.welcometext}>Welcome back, yo!</Text>
          <Text style={styles.desc}>
            Long time no see! Let’s login to get started.....
          </Text>
        </View>
        <Button
          text="Continue with Facebook"
          image={require("./assets/Facebook.png")}
          onPress={onFBButtonPress}
        />
        <Button
          text="Continue with Google"
          image={require("./assets/Google.png")}
          onPress={onGoogle}
        />
        <Button
          text="Continue with Email"
          image={require("./assets/Email.png")}
          onPress={() => navigation.navigate("SignIn")}
          backgroundColor={"#fff"}
          borderWidth={1}
          borderColor={"lightgray"}
        />
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  rectangle: {
    // backgroundColor: "red",
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    position: "absolute",
    bottom: 0,
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowColor: "gray",
    shadowOpacity: 0.5,
    elevation: 1,
  },
  welcometext: {
    color: "#2E3E5C",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
  },
  desc: {
    color: "#999999",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 50,
  },
});
