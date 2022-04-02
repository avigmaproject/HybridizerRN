import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import qs from "qs";
import Spinner from "react-native-loading-spinner-overlay";
import { useToast } from "native-base";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";
import { setToken, setLoggedIn } from "../../../store/action/auth/action";
import {
  verifyEmail,
  verifyPassword,
} from "../miscellaneous/miscellaneous.configure";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { register } from "../../../services/api.function";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmpassword] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState({
    secureTextEntry: true,
    secureTextEntryForConfirmPass: true,
  });
  const toast = useToast();

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntryForConfirmPass = () => {
    Keyboard.dismiss();
    setData({
      ...data,
      secureTextEntryForConfirmPass: !data.secureTextEntryForConfirmPass,
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
    if (confirmpassword.length === 0) {
      cancel = true;
    }
    if (cancel) {
      showerrorMessage("Fields can not be empty");
      return false;
    } else {
      return true;
    }
  };

  const checkPassEmail = (email, password) => {
    let cancel = false;
    if (verifyEmail(email)) {
      cancel = true;
      warningMessage("Please enter valid email");
    }
    if (verifyPassword(password)) {
      cancel = true;
      warningMessage(
        `Your password must be minimum 8 characters to 16 characters and must contain one uppercase, one digit and special character '?!@#$%^&*'`
      );
    }
    if (cancel) {
      return false;
    } else {
      return true;
    }
  };

  const passwordCheck = () => {
    if (password !== confirmpassword) {
      warningMessage("Password does not match");
      return false;
    } else {
      return true;
    }
  };

  const showerrorMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: "top",
        status: "error",
        duration: 5000,
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
      });
    }
  };

  const warningMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        status: "info",
        description: message,
        title: "Warning",
        placement: "top",
        duration: 5000,
      });
    }
  };

  const RegisterUser = async () => {
    Keyboard.dismiss();
    if (
      Validation() &&
      passwordCheck() &&
      checkPassEmail(email, confirmpassword)
    ) {
      setloading(true);

      let data = qs.stringify({
        username: email,
        password: confirmpassword,
        clientid: 2,
        grant_type: "password",
      });
      console.log(data);
      await register(data)
        .then((res) => {
          showMessage("Account created successfully");
          console.log("res: ", res);
          setloading(false);
          dispatch(setToken(res.access_token));
          dispatch(setLoggedIn(true));
        })
        .catch((error) => {
          setloading(false);
          showerrorMessage(error.response.data.error_description);
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{ height: windowHeight }}
      >
        <Spinner visible={loading} />
        <View>
          <Image
            source={require("../assets/Rectangle.png")}
            style={styles.rectangle}
          />
        </View>
        <Animatable.View animation={"fadeInUpBig"} style={styles.card}>
          <View style={{ marginTop: 25, paddingHorizontal: 25 }}>
            <Text style={styles.welcometext}>Sign Up</Text>
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
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
              placeholder="Enter Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              value={password}
              onChangeText={(password) => setPassword(password)}
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
              secureTextEntry={
                data.secureTextEntryForConfirmPass ? true : false
              }
              value={confirmpassword}
              onChangeText={(confirmpassword) =>
                setConfirmpassword(confirmpassword)
              }
            />
            <TouchableOpacity
              onPress={updateSecureTextEntryForConfirmPass}
              style={{
                position: "absolute",
                right: 40,
                top: 40,
                zIndex: 1,
              }}
            >
              <Icon
                name={
                  data.secureTextEntryForConfirmPass ? "eye-with-line" : "eye"
                }
                size={30}
                color="#ACACAC"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 35 }}>
            <Button
              backgroundColor="#30AD4A"
              text="Sign Up"
              onPress={RegisterUser}
            />
          </View>
          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 35 }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.forget}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;

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
    // textAlign: 'center',
  },
  forget: {
    color: "#388AF0",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
  },
});
