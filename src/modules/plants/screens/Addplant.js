import React, { Component } from "react";
import {
  View,
  Platform,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  PixelRatio,
  FlatList,
} from "react-native";
import Header from "../../../components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import InputField from "../../../components/InputField";
import ViewButton from "../../../components/ViewButton";
import TouchableBotton from "../../../components/TouchableBotton";
import { Toast } from "native-base";

import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import { SliderBox } from "react-native-image-slider-box";
import {
  registerstoreplantimage,
  createupdateplantmaster,
} from "../../../services/api.function";
import { connect } from "react-redux";
import {
  setPlantImage,
  setPlantInfo,
  setPlantDesc,
  setPlantImageArr,
} from "../../../store/action/plant/action";
import KeyboardSpacer from "react-native-keyboard-spacer";
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
class Addplant extends Component {
  constructor(props) {
    super(props);
    this.userNameInputRef = React.createRef();
    this.state = {
      addplantvisiable: false,
      DATA: [],
      isLoading: false,
      input: [],
      plantname: "Hybrid",
      categoryname: "101",
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

  onPressEdit = async () => this.ActionSheet.show();
  ImageGallery = async () => {
    setTimeout(
      function () {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          multiple: true,
          compressImageQuality: 0.5,
        }).then((image) => {
          let setimage = [];
          for (let i = 0; i < image.length; i++) {
            setimage.push(image[i].path);
          }
          console.log(image);
          // this.setState({
          //   ...this.state,
          //   imagePath: setimage,
          // });

          this.uploadImage("gallery", image);
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
          multiple: true,
          compressImageQuality: 0.5,
        }).then((image) => {
          console.log(image);
          let setimage = [];
          for (let i = 0; i < image.length; i++) {
            setimage.push(image[i].path);
          }
          console.log(image);
          // this.setState({
          //   ...this.state,
          //   imagePath: setimage,
          // });

          // console.log(this.state.form.imagePath);
          this.uploadImage("camera", image);
        });
      }.bind(this),
      1000
    );
  };
  uploadImage = async (type, image) => {
    let setimage = [];
    let setimagearr = [];
    if (type === "camera") {
      let data = JSON.stringify({
        Type: 1,
        Image_Base: "data:image/png;base64, " + image.data,
      });
      console.log(data, this.props.token);
      // return 0;
      await registerstoreplantimage(data, this.props.token)
        .then((res) => {
          setimagearr.push(res[0].Image_Path);
          setimage.push({
            PIM_ImageName: image.modificationDate,
            PIM_ImagePath: res[0].Image_Path,
            PIM_Size: image.size,
          });

          console.log("res:registerstoreplantimage", res[0].Image_Path);
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
    } else {
      for (let i = 0; i < image.length; i++) {
        let data = JSON.stringify({
          Type: 1,
          Image_Base: "data:image/png;base64, " + image[i].data,
        });
        console.log(data, this.props.token);
        await registerstoreplantimage(data, this.props.token)
          .then((res) => {
            setimagearr.push(res[0].Image_Path);
            setimage.push({
              PIM_ImageName: image[i].filename,
              PIM_ImagePath: res[0].Image_Path,
              PIM_Size: image[i].size,
            });

            console.log("res:registerstoreplantimage", res[0].Image_Path);
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
      }
    }

    console.log("==>", setimagearr);
    this.setState(
      {
        ...this.state,
        imagePath: setimage,
      },
      () => {
        this.props.setPlantImage(this.state.imagePath);
      }
    );
    this.props.setPlantImageArr(setimagearr);
    this.Clean();
  };
  Clean = () => {
    ImagePicker.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {
        // alert(e);
      });
  };
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      const { viewstatus } = this.props.route.params;
      this.setState({ viewstatus });
    });
  };
  AddInput = (key) => {
    let textInput = this.state.input;
    textInput.push(
      <View
        style={{ backgroundColor: "#F6F6F6", marginVertical: 10, height: 40 }}
      >
        <InputField
          onChangeText={(characteristics) =>
            this.onHandleChange(`Characteristics_${key + 2}`, characteristics)
          }
          // value={`Characteristics_${key+1}`}
          key={key}
          placeholder={`Characteristics`}
        />
      </View>
    );
    this.setState({ input: textInput });
  };
  AddplantvisiableClose = () => {
    this.setState({ addplantvisiable: !this.state.addplantvisiable });
  };
  _ChangeName = (action) => {
    if (action) {
      this.props.setPlantInfo({
        PlantName: this.state.plantname,
        PlantCategory: this.state.categoryname,
      });
    }
    this.setState({ iconvisible: !this.state.iconvisible });
  };
  onHandleChange = (key, value) => {
    if (key.startsWith("Characteristics_")) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          PD_Description: {
            ...this.state.form.PD_Description,
            [key]: value,
          },
        },
      });
    } else {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,

          [key]: value,
        },
      });
    }
  };
  Delete = (id) => {
    let plant = this.props.plantdesc;
  };
  DeleteDescription = (id) =>
    Alert.alert("Delete", "Are you sure to delete description", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => this.Delete(id) },
    ]);
  _handleSave = () => {
    this.state.setplantdesc.push(this.state.form);
    this.props.setPlantDesc(this.state.setplantdesc);
    this.setState(
      {
        ...this.state,
        form: {},
      },
      () => this.AddplantvisiableClose()
    );
  };
  _renderItem = (item, index) => {
    let arr = Object.values(item.PD_Description);
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: this.normalize(20),
              color: "#000",
              lineHeight: 50,
            }}
          >
            {item.PD_Title}
            {"  "}
          </Text>
          <TouchableOpacity onPress={() => this.AddplantvisiableClose(index)}>
            <Feather name="edit" size={18} color={"gray"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.DeleteDescription(index)}>
            <AntDesign name="delete" size={20} color={"gray"} />
          </TouchableOpacity>
        </View>
        {arr.map((comment, index) => {
          // console.log("descriptiondescription", comment, index);
          return (
            <View>
              <Text
                style={{
                  color: "#30AD4A",
                  elevation: 10,
                  lineHeight: 30,
                }}
              >
                {"\u2B24"}
                {"    "}
                <Text style={{ color: "black" }}>{comment}</Text>
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  SavePlantDecs = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 1,
      strPlant_Image_Master_DTO: JSON.stringify(this.props.plantimage),
      strPlant_Description_DTO: JSON.stringify(this.props.plantdesc),
    };
    // let data1 = {
    //   Type: 1,
    //   strPlant_Image_Master_DTO: this.state.imagePath,
    //   strPlant_Description_DTO: this.props.plantdesc,
    // };
    console.log(data, this.props.token);
    // return 0;
    await createupdateplantmaster(data, this.props.token)
      .then((res) => {
        console.log("res:registerstoreplantimage", res);
        this.setState({ isLoading: false });
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
  render() {
    const { title } = this.state.form;
    const {
      viewstatus,
      addplantvisiable,
      form,
      plantname,
      categoryname,
    } = this.state;
    console.log("form", form);
    console.log("state", this.state.imagePath);
    console.log("props", this.props.plantimagearr);
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
                  edit={true}
                  share={true}
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
                backgroundColor: addplantvisiable ? "#F2F2F2" : "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -15,
                paddingHorizontal: 20,
                height: "100%",
                paddingBottom: "50%",
              }}
            >
              {addplantvisiable ? (
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: this.normalize(20),
                      }}
                    >
                      Title
                    </Text>
                    <Icon
                      name="close-circle-outline"
                      size={20}
                      onPress={() => this.AddplantvisiableClose()}
                    />
                  </View>
                  <InputField
                    onChangeText={(title) =>
                      this.onHandleChange("PD_Title", title)
                    }
                    value={title}
                    placeholder={"Title"}
                  />
                  <View>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: this.normalize(20),
                      }}
                    >
                      Description
                    </Text>
                    <InputField
                      onChangeText={(characteristics) =>
                        this.onHandleChange(
                          `Characteristics_0`,
                          characteristics
                        )
                      }
                      placeholder={"Characteristics"}
                    />
                    <InputField
                      onChangeText={(characteristics) =>
                        this.onHandleChange(
                          `Characteristics_1`,
                          characteristics
                        )
                      }
                      placeholder={"Characteristics"}
                    />
                    <InputField
                      onChangeText={(characteristics) =>
                        this.onHandleChange(
                          `Characteristics_2`,
                          characteristics
                        )
                      }
                      placeholder={"Characteristics"}
                    />
                    {this.state.input.map((value, index) => {
                      return value;
                    })}

                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: "row",
                        // backgroundColor: "red",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "45%", height: 50 }}>
                        <Image
                          resizeMode="stretch"
                          style={{ width: "100%", height: "100%" }}
                          source={require("../../../assets/Rectangle1.png")}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            this.AddInput(this.state.input.length + 1)
                          }
                          style={{
                            // backgroundColor: "red",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#30AD4A",
                              fontSize: this.normalize(15),
                              fontWeight: "bold",
                            }}
                          >
                            + <Text>Add more</Text>
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: "45%", height: 50 }}>
                        <Image
                          resizeMode="stretch"
                          style={{ width: "100%", height: "100%" }}
                          source={require("../../../assets/Rectangle1.png")}
                        />
                        <TouchableOpacity
                          onPress={() => this._handleSave()}
                          style={{
                            // backgroundColor: "pink",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#30AD4A",
                              fontSize: this.normalize(15),
                              fontWeight: "bold",
                            }}
                          >
                            <Text>Save</Text>
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <KeyboardSpacer />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ paddingVertical: 5 }}>
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
                            <Text style={{ fontWeight: "normal" }}>
                              ({categoryname})
                            </Text>{" "}
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
                          <View style={{ width: "49%" }}>
                            <InputField
                              onChangeText={(categoryname) =>
                                this.setState({ categoryname })
                              }
                              value={categoryname}
                              placeholder={"Category"}
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

                    <Text> {moment().format("LL")}</Text>
                  </View>
                  {/* <ViewButton
                    source={require("../../../assets/ImgTree.png")}
                    title={"Hybrid Tree"}
                  /> */}

                  <View>
                    <ViewButton
                      onpress={() =>
                        this.props.navigation.navigate("AddSpouse")
                      }
                      source={require("../../../assets/leaftree.png")}
                      title={"Add Seedling/Spouse"}
                    />

                    <View
                      style={{
                        backgroundColor: "#F7F8FD",
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginHorizontal: -17,
                      }}
                    >
                      <FlatList
                        data={this.props.plantdesc}
                        renderItem={({ item, index }) => {
                          return this._renderItem(item, index);
                        }}
                        keyExtractor={(item) => item.id}
                      />
                    </View>

                    <TouchableBotton
                      onPress={() => this.AddplantvisiableClose()}
                      color={"#30AD4A"}
                      backgroundColor={"#EAF7ED"}
                      title={"+ Add Characteristics"}
                      borderWidth={2}
                      borderColor={"#30AD4A"}
                      borderStyle={"dashed"}
                      height={50}
                      font={true}
                    />

                    {(this.props.plantdesc.length > 0 ||
                      this.props.plantimage.length > 0) && (
                      <>
                        {/* <TouchableBotton
                          onPress={() => this.SavePlantDecs()}
                          color={"#fff"}
                          backgroundColor={"#30AD4A"}
                          title={"Save"}
                        /> */}

                        <TouchableBotton
                          // onPress={() =>
                          //   this.props.setPlantImage([
                          //     require("../../../assets/plantname.png"),
                          //   ])
                          // }
                          onPress={() => this.SavePlantDecs()}
                          backgroundColor={"#EAF7ED"}
                          title={"Save to My Plants"}
                          height={50}
                          font={true}
                        />
                      </>
                    )}

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
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {viewstatus ||
          ((this.props.plantdesc.length > 0 ||
            this.props.plantimage.length > 0) && (
            <TouchableOpacity
              onPress={() => alert("Copied")}
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
                source={require("../../../assets/Duplicate.png")}
              />
            </TouchableOpacity>
          ))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Addplant);
