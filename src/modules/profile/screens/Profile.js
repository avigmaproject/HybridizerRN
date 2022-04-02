import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  PixelRatio,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Header from "../../../components/Header";
import Icon from "react-native-vector-icons/Entypo";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { Toast } from "native-base";
import { signout } from "../../../store/action/auth/action";
import { logoutAccount } from "../../../store/action/plant/action";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import Spinner from "react-native-loading-spinner-overlay";
import ImagePicker from "react-native-image-crop-picker";
import { SliderBox } from "react-native-image-slider-box";
import {
  registerstoreimage,
  getusermasterdata,
  userprofileupdate,
} from "../../../services/api.function";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
const options = [
  "Cancel",
  <View>
    <Text style={{ color: "#53a20a" }}>Gallery</Text>
  </View>,
  <Text style={{ color: "#53a20a" }}>Camera</Text>,
];
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let hasNotch = DeviceInfo.hasNotch();
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
class Addplant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addplantvisiable: false,
      isLoading: false,
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
      iconvisible: true,
      imagePath: [require("../../../assets/plantname.png")],
      secureTextEntry: true,
      secureTextEntry1: true,
    };
  }
  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  Logout = () => {
    this.props.signout();
    this.props.logoutAccount();
  };
  onPressEdit = async () => this.ActionSheet.show();
  ImageGallery = async () => {
    setTimeout(
      function () {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          compressImageQuality: 0.5,
        }).then((image) => {
          console.log(image);
          this.setState({
            imagePath: [image.path],
            base64: image.data,
          });
          this.uploadImage(image);
        });
      }.bind(this),
      1000
    );
  };
  ImageCamera = async () => {
    setTimeout(
      function () {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          compressImageQuality: 0.5,
        }).then((image) => {
          console.log(image);
          this.setState({
            imagePath: [require("../../../assets/plantname.png")],
          });
          this.setState({
            imagePath: [image.path],
            base64: image.data,
          });
          this.uploadImage(image);
        });
      }.bind(this),
      1000
    );
  };
  uploadImage = async (image) => {
    this.setState({
      isLoading: true,
    });

    let data = JSON.stringify({
      Type: 1,
      Image_Base: "data:image/png;base64, " + image.data,
    });
    console.log(data, this.props.token);
    // return 0;
    await registerstoreimage(data, this.props.token)
      .then((res) => {
        this.setState({
          isLoading: false,
          imagePath: [res[0].Image_Path],
        });
        console.log("res:registerstoreimage", res[0].Image_Path);
      })
      .catch((error) => {
        if (error.request) {
          console.log(error.request);
        } else if (error.responce) {
          console.log(error.responce);
        } else {
          console.log(error);
        }
      });
    this.Clean();
  };
  Clean = () => {
    ImagePicker.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._GetUserMasterData();
    });
  };
  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  updatesecureTextEntry1 = () => {
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1,
    });
  };
  showMessage = (message, status) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        description: message,
        title: status.toUpperCase(),
        placement: "bottom",
        status: status,
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };
  Validation = () => {
    const invalidFields = [];

    const { password, name, imagePath, confirmpassword } = this.state;
    if (!name) {
      invalidFields.push("firstname");
      this.showMessage("Name is required.", "error");
    }
    if (!password) {
      invalidFields.push("password");
      this.showMessage("Password is required.", "error");
    }
    if (password !== confirmpassword) {
      this.showMessage("Password  Confirm Password is required.", "error");
    }
    return invalidFields.length > 0;
  };

  Submit = async () => {
    const validate = this.Validation();
    if (!validate) {
      let data = {
        User_Name: this.state.name,
        User_Password: this.state.password,
        Type: 12,
        User_Image_Path: this.state.imagePath[0],
      };
      console.log(data, this.props.token);
      await userprofileupdate(data, this.props.token)
        .then((res) => {
          console.log("res: ", res[0]);
          this.showMessage("Profile updated successfully.", "success");

          this.setState(
            {
              visible: true,
            },
            () => this._GetUserMasterData()
          );
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ isLoading: false });
            console.log("error.response", error.response);
          } else if (error.request) {
            this.setState({ isLoading: false });
            console.log("request error", error.request);
          } else if (error) {
            alert("Server Error");
            this.setState({ isLoading: false });
          }
        });
    }
  };

  Logout = () => {
    this.props.signout(), this.props.logoutAccount();
  };

  _GetUserMasterData = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 2,
    };
    console.log("_GetUserMasterData", data, this.props.token);
    await getusermasterdata(data, this.props.token)
      .then((res) => {
        console.log("res:getusermasterdata ", res[0]);
        this.setState({
          userid: res[0][0].User_PkeyID,
          isLoading: false,
          email: res[0][0].User_Email,
          password: res[0][0].User_Password,
          confirmpassword: res[0][0].User_Password,
          name: res[0][0].User_Name,
          imagePath: res[0][0].User_Image_Path
            ? [res[0][0].User_Image_Path]
            : [require("../../../assets/plantname.png")],
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log("responce_error", error.response);
        } else if (error.request) {
          console.log("request error", error.request);
        }
      });
  };
  render() {
    const { addplantvisiable, username, surname } = this.state;
    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: "black" }}>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <Spinner visible={this.state.isLoading} />
          <View>
            <View>
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                <Header
                  onpressedit={() => this.onPressEdit()}
                  edit={true}
                  share={false}
                  logout={true}
                  Logout={() => this.Logout()}
                  navigation={this.props.navigation}
                />
              </View>
              <View style={{}}>
                <SliderBox
                  imageLoadingColor={"#30AD4A"}
                  resizeMode={"cover"}
                  sliderBoxHeight={300}
                  images={this.state.imagePath}
                  // onCurrentImagePressed={(index) =>
                  //   console.warn(`image ${index} pressed`)
                  // }
                  // currentImageEmitter={(index) =>
                  //   console.warn(`current pos is: ${index}`)
                  // }
                  // autoplay
                  // circleLoop
                />
              </View>
            </View>
            <Animatable.View
              style={{
                backgroundColor: addplantvisiable ? "#F2F2F2" : "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -15,
                height: "100%",
                paddingBottom: "50%",
              }}
            >
              <View style={{ marginTop: 25, paddingHorizontal: 25 }}>
                <Text style={styles.welcometext}>Profile</Text>
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                <TextInput
                  header="Name"
                  placeholder="Enter your name ..."
                  value={this.state.name}
                  onChangeText={(name) => this.setState({ name })}
                />
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                <TextInput
                  editable={false}
                  header="Email Address"
                  placeholder="Enter email address ..."
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                <TextInput
                  header="Password"
                  placeholder="Enter Password"
                  secureTextEntry={this.state.secureTextEntry ? true : false}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                />
                <TouchableOpacity
                  onPress={() => this.updateSecureTextEntry()}
                  style={{
                    position: "absolute",
                    right: 40,
                    top: 40,
                    zIndex: 1,
                  }}
                >
                  <Icon
                    name={this.state.secureTextEntry ? "eye-with-line" : "eye"}
                    size={30}
                    color="#ACACAC"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                <TextInput
                  header="Confirm Password"
                  placeholder="Enter Confirm Password"
                  secureTextEntry={this.state.secureTextEntry1 ? true : false}
                  value={this.state.confirmpassword}
                  onChangeText={(confirmpassword) =>
                    this.setState({ confirmpassword })
                  }
                />
                <TouchableOpacity
                  onPress={() => this.updatesecureTextEntry1()}
                  style={{
                    position: "absolute",
                    right: 40,
                    top: 40,
                    zIndex: 1,
                  }}
                >
                  <Icon
                    name={this.state.secureTextEntry1 ? "eye-with-line" : "eye"}
                    size={30}
                    color="#ACACAC"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 35 }}>
                <Button
                  backgroundColor="#30AD4A"
                  text="Submit"
                  onPress={() => {
                    this.Submit();
                  }}
                />
              </View>
            </Animatable.View>
            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: this.normalize(18),
                  }}
                >
                  Profile Photo
                </Text>
              }
              options={options}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              useNativeDriver={true}
              onPress={(index) => {
                if (index === 0) {
                  // cancel action
                } else if (index === 1) {
                  this.ImageGallery();
                } else if (index === 2) {
                  this.ImageCamera();
                }
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
});

const mapDispatchToProps = { signout, logoutAccount };
export default connect(mapStateToProps, mapDispatchToProps)(Addplant);
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
