import React, { Component } from "react";
import {
  View,
  Platform,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import Header from "../../../components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import InputField from "../../../components/InputField";
import ViewButton from "../../../components/ViewButton";
import TouchableBotton from "../../../components/TouchableBotton";
import { Toast } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { SliderBox } from "react-native-image-slider-box";
import { createupdatesddseedling } from "../../../services/api.function";
import { connect } from "react-redux";
import {
  setPlantImage,
  setPlantInfo,
  setPlantDesc,
  setPlantImageArr,
} from "../../../store/action/plant/action";
import DeviceInfo from "react-native-device-info";
const options = [
  "Cancel",
  <View>
    <Text style={{ color: "#53a20a" }}>Gallery</Text>
  </View>,
  <Text style={{ color: "#53a20a" }}>Camera</Text>,
];
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
let hasNotch = DeviceInfo.hasNotch();
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
class AddSpouse extends Component {
  constructor(props) {
    super(props);
    this.userNameInputRef = React.createRef();
    this.state = {
      modalVisible: false,
      addplantvisiable: true,
      DATA: [],
      isLoading: false,
      input: [],
      plantname: "Name of the plant",
      form: {},
      description: {},
      viewstatus: false,
      iconvisible: true,
      imagePath: [require("../../../assets/plantname.png")],
      // images: [
      //   "https://source.unsplash.com/1024x768/?nature",
      //   "https://source.unsplash.com/1024x768/?water",
      //   "https://source.unsplash.com/1024x768/?girl",
      //   "https://source.unsplash.com/1024x768/?tree", // Network image
      //   require("../../../assets/plantname.png"), // Local image
      // ],
      setplantdesc: [],
      duplicates: 1,
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

  showMessage = (message, status) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: status,
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };
  AddplantvisiableClose = () => {
    this.setState({ addplantvisiable: !this.state.addplantvisiable });
  };
  SavePlantDecs = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 1,
      ASE_Title: this.state.plantname,
      ASE_NO_Dup: this.state.duplicates,
    };

    console.log(data, this.props.token);
    // return 0;
    await createupdatesddseedling(data, this.props.token)
      .then((res) => {
        console.log("res:createupdatesddseedling", res);
        this.setState({
          isLoading: false,
          addplantvisiable: !this.state.addplantvisiable,
        });
        this.showMessage("Plant save successfully.", "success");
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
  };

  _ChangeName = (action) => {
    this.setState({
      ...this.state,
      plantname: "",
    });
    if (action) {
      this.props.setPlantInfo({
        PlantName: this.state.plantname,
      });
    }
    this.setState({ iconvisible: !this.state.iconvisible });
  };
  AddInput = (key) => {
    let textInput = this.state.input;
    textInput.push(
      <View
        style={{
          backgroundColor: "#fff",
          // marginVertical: 10,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          marginTop: 10,
          borderColor: "lightgray",
          borderWidth: 1,
          flexDirection: "row",
          paddingVertical: 10,
        }}
      >
        <View>
          <Image
            resizeMode="stretch"
            style={{ height: 40, width: 40 }}
            source={require("../../../assets/leaftree.png")}
          />
          <View style={{ marginTop: 10 }} />
          <TouchableBotton
            onPress={() =>
              this.props.navigation.navigate("Addplant", { viewstatus: false })
            }
            color={"#30AD4A"}
            backgroundColor={"#EAF7ED"}
            title={"New"}
            height={30}
            marginBottom={true}
          />
        </View>
        <View>
          <Image
            resizeMode="stretch"
            style={{ height: 40, width: 40 }}
            source={require("../../../assets/clipboard-notes.png")}
          />
          <View style={{ marginTop: 10 }} />
          <TouchableBotton
            onPress={() =>
              this.setState({ modalVisible: !this.state.modalVisible })
            }
            color={"#30AD4A"}
            backgroundColor={"#EAF7ED"}
            title={"New"}
            height={30}
            marginBottom={true}
          />
        </View>
        <View>
          <Image
            resizeMode="stretch"
            style={{ height: 40, width: 40 }}
            source={require("../../../assets/openmoji.png")}
          />
          <View style={{ marginTop: 10 }} />
          <TouchableBotton
            onPress={() => this.AddplantvisiableClose()}
            color={"#30AD4A"}
            backgroundColor={"#EAF7ED"}
            title={"New"}
            height={30}
            marginBottom={true}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <AntDesign name="down" size={25} color={"gray"} />
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <AntDesign name="delete" size={25} color={"gray"} />
        </View>
      </View>
    );
    this.setState({ input: textInput });
  };
  renderModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          //   transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                  paddingRight: 20,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }
                >
                  <Icon
                    name="close-circle-outline"
                    size={20}
                    onPress={() =>
                      this.setState({ modalVisible: !this.state.modalVisible })
                    }
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>Notes</Text>
              <View
                style={{
                  backgroundColor: "#F6F6F6",
                  //   marginVertical: 10,
                  height: 200,
                  paddingLeft: 10,
                  width: 350,
                  marginBottom: 100,
                }}
              >
                <TextInput
                  //   onChangeText={}
                  style={{
                    height: 200,
                    width: "100%",
                    marginTop: 20,
                    marginLeft: 20,
                  }}
                  placeholder={"Enter a note"}
                  multiline={true}
                  numberOfLines={10}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }} />
            <TouchableBotton
              onPress={() => this.SavePlantDecs()}
              color={"#fff"}
              backgroundColor={"#30AD4A"}
              title={"Save"}
              height={50}
              font={true}
            />
          </View>
        </Modal>
      </View>
    );
  };
  render() {
    const { duplicates } = this.state.form;
    const {
      viewstatus,
      addplantvisiable,
      form,
      plantname,
      categoryname,
    } = this.state;
    console.log(this.state.input, "minal");
    return (
      <View>
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
                  edit={false}
                  share={false}
                  navigation={this.props.navigation}
                />
              </View>
              <View style={{}}>
                <SliderBox
                  imageLoadingColor={"#30AD4A"}
                  resizeMode={"cover"}
                  sliderBoxHeight={hasNotch ? 300 : 250}
                  images={
                    this.props.plantimagearr
                      ? this.props.plantimagearr
                      : this.state.images
                  }
                  // onCurrentImagePressed={(index) =>
                  //   console.warn(`image ${index} pressed`)
                  // }
                  // currentImageEmitter={(index) =>
                  //   console.warn(`current pos is: ${index}`)
                  // }
                  // autoplay
                  // circleLoop
                  dotColor="#FFF"
                  inactiveDotColor="#90A4AE"
                  dotStyle={{
                    bottom: 20,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -15,
                height: "100%",
                // paddingBottom: "0%",
              }}
            >
              {!addplantvisiable ? (
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ paddingVertical: 15 }}>
                    {this.state.iconvisible ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ width: "90%", height: 50 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: this.normalize(18),
                              color: "#000",
                              lineHeight: 40,
                            }}
                          >
                            {plantname}{" "}
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => this._ChangeName(false)}
                          >
                            <AntDesign name="edit" size={25} color={"gray"} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          height: 50,
                        }}
                      >
                        <View
                          style={{
                            width: "90%",
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              width: "49%",
                              marginRight: 5,
                            }}
                          >
                            <InputField
                              onChangeText={(plantname) =>
                                this.setState({ plantname })
                              }
                              value={plantname}
                              placeholder={"Plant Name"}
                            />
                          </View>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => this._ChangeName(true)}
                          >
                            <AntDesign name="save" size={30} color={"gray"} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    <InputField
                      onChangeText={(value) => {
                        let duplicates = value;
                        duplicates = duplicates.replace(/[^0-9]/gi, "");
                        this.setState({ duplicates });
                      }}
                      value={duplicates}
                      placeholder={"Select Number of Duplicates"}
                    />
                  </View>
                  <TouchableBotton
                    onPress={() => this.SavePlantDecs()}
                    color={"#fff"}
                    backgroundColor={"#30AD4A"}
                    title={"Save"}
                    height={50}
                    font={true}
                  />
                </View>
              ) : (
                <>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Select existing profile as spouse
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.AddInput(this.state.input.length + 1)
                        }
                        style={{ padding: 10, backgroundColor: "#F7F8FD" }}
                      >
                        <AntDesign
                          name="pluscircleo"
                          size={25}
                          color={"gray"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#F7F8FD",
                      padding: 10,
                      marginTop: 30,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                    <View>
                      <Text>List</Text>
                    </View>
                    {this.state.input.map((value, index) => {
                      return value;
                    })}
                  </View>
                </>
              )}
            </View>
          </View>
          {this.renderModal()}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  plantdesc: state.plantReducer.plantdesc,
  plantimage: state.plantReducer.plantimage,
  plantimagearr: state.plantReducer.plantimagearr,
});

const mapDispatchToProps = {
  setPlantInfo,
  setPlantDesc,
  setPlantImage,
  setPlantImageArr,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSpouse);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
