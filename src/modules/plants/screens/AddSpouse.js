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
  FlatList,
  Alert,
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
import {
  createupdatesddseedling,
  getplantmaster,
  createupdateaddspouse,
  getaddspouse,
  createupdateaddseedling,
} from "../../../services/api.function";
import { connect } from "react-redux";
import {
  setPlantImage,
  setPlantInfo,
  setPlantDesc,
  setPlantImageArr,
  setSpouseId,
  logoutAccount,
  setPlantId,
} from "../../../store/action/plant/action";
import { setCustomeView } from "../../../store/action/custom/action";
import DeviceInfo from "react-native-device-info";
import KeyboardSpacer from "react-native-keyboard-spacer";

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
      hide: false,
      imagePath: [require("../../../assets/plantname.png")],
      setplantdesc: [],
      duplicates: 0,
      plant: [],
      // plant: [
      //   {
      //     Plant_PkeyID: 207,
      //     Plant_Name: "Plant p",
      //     Plant_Description: null,
      //     Plant_ParentID: 206,
      //     Plant_IsParent: true,
      //   },
      //   {
      //     Plant_PkeyID: 206,
      //     Plant_Name: "Seedling 2",
      //     Plant_Description: null,
      //     Plant_ParentID: 0,
      //     Plant_IsParent: true,
      //   },
      // ],
      newplantarrar: [],
      plantid: 0,
      selectedid: 0,
      note: "",
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
        description: message,
        title: status,
        placement: "bottom",
        status: status,
        duration: 5000,
      });
    }
  };
  AddplantvisiableClose = (item) => {
    this.props.setSpouseId(item.ASP_PkeyID);
    this.setState({
      addplantvisiable: !this.state.addplantvisiable,
      duplicates: 1,
      plantname: "Plant name",
      iconvisible: true,
    });
  };
  SavePlantDecs = async () => {
    if (this.state.plantname !== "" && this.state.duplicates > 0) {
      this.setState({ isLoading: true });
      let data = {
        Type: 1,
        ASE_Title: this.state.plantname,
        ASE_NO_Dup: this.state.duplicates,
        ASE_Plant_PkeyID: this.props.plantid, //minal
        ASE_ASP_PkeyID: this.props.spouseid,
      };
      console.log(data, this.props.token);
      // return 0;
      await createupdatesddseedling(data, this.props.token)
        .then((res) => {
          console.log("res:createupdatesddseedling", res);
          this.setState({
            isLoading: false,
            addplantvisiable: !this.state.addplantvisiable,
            hide: !this.state.hide,
            iconvisible: true,
            isLoading: false,
          });
          this.GetAddSpouse();
          this.showMessage("Seedling saved successfully.", "success");
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
      this.showMessage(
        "Please enter plant name and number of duplicates.",
        "error"
      );
    }
  };
  GetAddSpouse = async () => {
    // this.setState({ isLoading: true });
    let data = {
      Type: 3,
      ASP_Plant_PkeyID: this.props.plantid,
    };

    console.log("GetAddSpouse", data, this.props.token);
    // return 0;
    await getaddspouse(data, this.props.token)
      .then((res) => {
        console.log("res:getaddspouse", res[0]);
        this.setState({
          newplantarrar: res[0],
          isLoading: false,
          isLoading: false,
        });
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
  CreateUpdateAddSpouse = async (item) => {
    console.log("CreateUpdateAddSpouse", item);
    this.setState({ isLoading: true, plantid: item.Plant_PkeyID });
    let data = {
      Type: 1,
      ASP_Title: item.Plant_Name,
      ASP_Description: item.Plant_Description,
      ASP_Plant_PkeyID: item.Plant_PkeyID,
      ASP_ParentID: this.props.plantid,
      ASP_Type: 1,
    };

    console.log(data, this.props.token);
    // return 0;
    await createupdateaddspouse(data, this.props.token)
      .then((res) => {
        console.log("res:createupdateaddspouse", res);
        this.GetAddSpouse();
        this.setState({
          isLoading: false,
        });
        this.showMessage("Spouse plant saved successfully.", "success");
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
  DeleteDescriptionSeedling = (item) =>
    Alert.alert("Delete", "Are you sure to delete Spouse plant.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => this.CreateUpdateAddSeedlingDelete(item) },
    ]);
  CreateUpdateAddSeedlingDelete = async (item) => {
    console.log("createupdateaddseedlingdelete", item);
    this.setState({ isLoading: true });
    let data = {
      Type: 4,
      ASE_PkeyID: item.ASE_PkeyID,
    };

    console.log(data, this.props.token);
    // return 0;
    await createupdateaddseedling(data, this.props.token)
      .then((res) => {
        console.log("res:createupdateaddseedling", res);
        this.GetAddSpouse();
        this.setState({
          isLoading: false,
        });
        this.showMessage("Seddling plant deleted successfully.", "success");
      })
      .catch((error) => {
        this.showMessage("Seddling plant deleted unsuccessfully.", "error");
        if (error.request) {
          console.log(error.request);
        } else if (error.responce) {
          console.log(error.responce);
        } else {
          console.log(error);
        }
      });
  };
  DeleteDescription = (item) =>
    Alert.alert("Delete", "Are you sure to delete Spouse plant.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => this.CreateUpdateAddSpouseDelete(item) },
    ]);
  CreateUpdateAddSpouseDelete = async (item) => {
    console.log("CreateUpdateAddSpouseDelete", item);
    this.setState({ isLoading: true });
    let data = {
      Type: 3,
      ASP_PkeyID: item.ASP_PkeyID,
    };

    console.log(data, this.props.token);
    // return 0;
    await createupdateaddspouse(data, this.props.token)
      .then((res) => {
        console.log("res:createupdateaddspouse", res);
        this.GetAddSpouse();
        this.setState({
          isLoading: false,
        });
        this.showMessage("Spouse plant deleted successfully.", "success");
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
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.props.plantid > 0) {
        this._GetPlantMaster1();
        this.GetAddSpouse();
        this._GetPlantMaster();
      }
    });
  };
  _GetPlantMaster1 = async () => {
    let newplant = [];
    let data = {
      Type: 4,
    };

    console.log("_GetPlantMaster", data, this.props.token);
    await getplantmaster(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0]);
        for (let i = 0; i < res[0].length; i++) {
          if (res[0][i].Plant_PkeyID !== this.props.plantid) {
            newplant.push(res[0][i]);
          } else {
            console.log("else paert same id", res[0][i]);
          }
        }
        console.log("newplantnewplant", newplant);
        this.setState({ plant: newplant });
      })
      .catch((error) => {
        if (error.response) {
          console.log("responce_error", error.response);
        } else if (error.request) {
          console.log("request error", error.request);
        }
      });
  };
  _GetPlantMaster = async () => {
    let imagesrc = [];
    let data = {
      Plant_PkeyID: this.props.plantid,
      Type: 2,
    };

    console.log("_GetPlantMaster", data, this.props.token);
    await getplantmaster(data, this.props.token)
      .then((res) => {
        if (res[0][0].plant_Image_Master_DTOs.length > 0) {
          for (let i = 0; i < res[0][0].plant_Image_Master_DTOs.length; i++) {
            imagesrc.push(res[0][0].plant_Image_Master_DTOs[i].PIM_ImagePath);
            console.log(imagesrc);
          }
        } else {
          defualt = [require("../../../assets/plantname.png")];
        }

        this.setState({
          imagePath:
            res[0][0].plant_Image_Master_DTOs.length > 0 ? imagesrc : defualt,
          isLoading: false,
        });
        this.props.setPlantImageArr(this.state.imagePath);
        this.props.setPlantImage(res[0][0].plant_Image_Master_DTOs);
      })
      .catch((error) => {
        if (error.response) {
          console.log("responce_error", error.response);
        } else if (error.request) {
          console.log("request error", error.request);
        }
      });
  };
  _ChangeName = (action) => {
    if (action) {
      this.props.setPlantInfo({
        PlantName: this.state.plantname,
      });
    } else {
      this.setState({
        ...this.state,
        plantname: "",
      });
    }
    this.setState({ iconvisible: !this.state.iconvisible });
  };
  Hide = (item) => {
    this.props.setSpouseId(item.ASP_PkeyID);
    this.setState({ hide: !this.state.hide, selectedid: item.ASP_PkeyID });
  };
  AddNote = async () => {
    if (this.state.note === "") {
      alert("Please enter note.");
    } else {
      this.setState({ isLoading: true });

      let data = {
        Type: 6,
        ASP_Description: this.state.note,
        ASP_PkeyID: this.props.spouseid,
      };
      console.log(data, this.props.token);
      await createupdateaddspouse(data, this.props.token)
        .then((res) => {
          console.log("res: ", res);
          this.setState(
            {
              modalVisible: !this.state.modalVisible,
              isLoading: false,
            },
            () => this.GetAddSpouse()
          );

          this.showMessage("Note saved successfully.", "success");
        })
        .catch((error) => {
          if (error.response) {
            console.log("responce_error", error.response);
          } else if (error.request) {
            console.log("request error", error.request);
          }
        });
    }
  };
  _SelectItem = (item) => {
    console.log("_SelectItem", item.ASP_Plant_PkeyID);
    this.props.setSpouseId(item.ASP_Plant_PkeyID);
    this.props.navigation.navigate("AddNewSpouse");
  };
  AddInput = (item) => {
    // console.log("AddInput", item);
    let totalduplicates = 0;
    if (item.add_Seedling_DTOs.length > 0) {
      for (let i = 0; i < item.add_Seedling_DTOs.length; i++) {
        totalduplicates =
          totalduplicates + item.add_Seedling_DTOs[i].ASE_NO_Dup;
      }
    }
    return (
      <View
        style={{
          backgroundColor:
            this.state.hide && this.props.spouseid === item.ASP_PkeyID
              ? "#ECFCEF"
              : "#fff",
          // marginVertical: 10,
          paddingHorizontal: 10,
          marginTop: 10,
          borderColor:
            !this.state.hide && this.props.spouseid === item.ASP_PkeyID
              ? "black"
              : "lightgray",
          borderWidth: 1,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "red",
          }}
        >
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              // backgroundColor: "pink",
              width: "24%",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/leaftree.png")}
            />
            <View style={{ marginTop: 10 }} />
            <TouchableBotton
              onPress={() => this._SelectItem(item)}
              color={"#30AD4A"}
              backgroundColor={"#EAF7ED"}
              title={item.ASP_Title}
              height={30}
              marginBottom={true}
            />
          </View>
          <View
            style={{
              width: "24%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/notes.png")}
            />
            <View style={{ marginTop: 10 }} />
            <TouchableBotton
              onPress={() => this.AddNotes(item)}
              color={"#30AD4A"}
              backgroundColor={"#EAF7ED"}
              title={"Notes"}
              height={30}
              marginBottom={true}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              width: "24%",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/openmoji.png")}
            />
            <View style={{ marginTop: 10 }} />
            <TouchableBotton
              onPress={() => this.AddplantvisiableClose(item)}
              color={"#30AD4A"}
              backgroundColor={"#EAF7ED"}
              title={"Add Seedling"}
              height={30}
              marginBottom={true}
            />
          </View>
          <View
            style={{
              width: "11%",
              // backgroundColor: "orange",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.add_Seedling_DTOs.length > 0 &&
              (this.state.hide && this.props.spouseid === item.ASP_PkeyID ? (
                <TouchableOpacity
                  onPress={() => this.Hide(item)}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="down" size={25} color="gray" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.Hide(item)}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name={"up"} size={20} color="#323232" />
                </TouchableOpacity>
              ))}
          </View>
          <View
            style={{
              width: "11%",
              // backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.DeleteDescription(item)}
              style={{
                justifyContent: "center",
              }}
            >
              <AntDesign name="delete" size={25} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginRight: 20 }}>
          {this.state.hide && this.props.spouseid === item.ASP_PkeyID && (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={4}
              initialNumToRender={item.add_Seedling_DTOs.length}
              data={item.add_Seedling_DTOs}
              renderItem={({ item, index }) => {
                // console.log("add_Seedling_DTOs", item);
                return (
                  <>
                    <View
                      style={{
                        height: 100,
                        width: "25%",
                        alignItems: "center",
                        marginLeft: 5,
                        backgroundColor: "#fff",
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => alert(`${item.ASE_Title}_${index + 1}`)}
                        style={{
                          height: "70%",
                          width: "100%",
                          paddingVertical: 3,
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={{ height: "90%", width: "90%" }}
                          source={require("../../../assets/flower1.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.DeleteDescriptionSeedling(item)}
                        style={{
                          justifyContent: "center",
                          position: "absolute",
                          top: -5,
                          left: -5,
                        }}
                      >
                        <AntDesign name="delete" size={20} color="red" />
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: "#30AD4A",
                          width: "100%",
                          height: "30%",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopEndRadius: 10,
                          borderTopStartRadius: 10,
                          padding: 5,
                        }}
                      >
                        <Text
                          ellipsizeMode={"middle"}
                          numberOfLines={2}
                          style={{ color: "#fff" }}
                        >{`${item.ASE_Title}_${index + 1}`}</Text>
                      </View>
                    </View>
                  </>
                );
              }}
              keyExtractor={() => "_" + Math.random().toString(36).substr(2, 9)}
            />
            // <View
            //   style={{
            //     flexDirection: "row",
            //     flexWrap: "wrap",
            //     alignItems: "center",
            //   }}
            // >
            //   {this.flower(totalduplicates)}
            // </View>
          )}
        </View>
      </View>
    );
  };
  AddNotes = (item) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      note: item.ASP_Description,
    });
    this.props.setSpouseId(item.ASP_PkeyID);
  };

  renderModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          //   transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("modal closed");
          }}
        >
          <View style={styles.centeredView}>
            <ScrollView
              keyboardShouldPersistTaps={"handled"}
              showsVerticalScrollIndicator={false}
            >
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
                        this.setState({
                          modalVisible: !this.state.modalVisible,
                        })
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalText}>Notes</Text>
                <View
                  style={{
                    // backgroundColor: "red",
                    //   marginVertical: 10,
                    height: 200,
                    width: "90%",
                    marginBottom: 100,
                  }}
                >
                  <TextInput
                    onChangeText={(note) => this.setState({ note })}
                    style={{
                      height: 200,
                      paddingLeft: 20,
                      backgroundColor: "#f6f6f6",
                      paddingTop: 20,
                    }}
                    placeholder={"Enter a note"}
                    multiline={true}
                    numberOfLines={10}
                    value={this.state.note}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10 }} />
              <TouchableBotton
                onPress={() => this.AddNote()}
                color={"#fff"}
                backgroundColor={"#30AD4A"}
                title={"Save"}
                height={50}
                font={true}
              />
              <KeyboardSpacer />
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };
  _AddToPlant = (item) => {
    this.CreateUpdateAddSpouse(item);
  };
  addNewPlant = () => {
    // alert("Functionality is Left.");
    this.props.setPlantImageArr([require("../../../assets/plantname.png")]);
    this.props.setSpouseId(0);
    this.props.navigation.navigate("AddNewSpouse");
  };

  render() {
    const {
      addplantvisiable,
      plantname,
      duplicates,
      newplantarrar,
    } = this.state;
    return (
      <View style={{ height: "100%" }}>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <Spinner visible={this.state.isLoading} />
          <View>
            <View>
              {this.state.addplantvisiable && (
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                  }}
                >
                  <Header
                    back2={true}
                    onpressedit={() => this.onPressEdit()}
                    edit={false}
                    share={false}
                    navigation={this.props.navigation}
                  />
                </View>
              )}

              {!this.state.addplantvisiable && (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      addplantvisiable: !this.state.addplantvisiable,
                    })
                  }
                  style={{
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    position: "absolute",
                    zIndex: 1,
                    // padding: 1,
                    marginLeft: 10,
                    marginTop: 55,
                  }}
                >
                  <Icon name="chevron-back-outline" size={30} />
                </TouchableOpacity>
              )}
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
                            <AntDesign name="edit" size={25} color="gray" />
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
                            <AntDesign name="save" size={30} color="gray" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    <InputField
                      onChangeText={(value) => {
                        let duplicates;
                        duplicates = value.replace(/[^0-9]/gi, "");
                        this.setState({ duplicates });
                      }}
                      value={duplicates}
                      placeholder={"Select Number of Duplicates..."}
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
                      paddingHorizontal: 10,
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      Select existing profile as spouse
                    </Text>

                    <View
                      style={{
                        // backgroundColor: "pink",
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.state.plant}
                        ListHeaderComponentStyle={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 20,
                        }}
                        ListHeaderComponent={() => {
                          return (
                            <TouchableOpacity
                              onPress={() => this.addNewPlant()}
                              style={{
                                backgroundColor: "#F7F8FD",
                              }} //"#F7F8FD"
                            >
                              <AntDesign
                                name="pluscircleo"
                                size={25}
                                color="gray"
                                style={{ padding: 20, alignSelf: "center" }}
                              />
                              <Text
                                style={{
                                  // fontWeight: "bold",
                                  paddingHorizontal: 5,
                                  paddingBottom: 10,
                                }}
                              >
                                Add Spouse
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                        renderItem={({ item }) => {
                          // console.log("renderItemrenderItem", item);
                          return (
                            <TouchableOpacity
                              onPress={() => this._AddToPlant(item)}
                              style={{
                                width: 90,
                                backgroundColor: "#fff",
                                borderRadius: 5,
                                marginRight: 5,
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: "gray",
                                shadowOpacity: 0.9,
                                elevation: 5,
                                height: 90,
                                marginVertical: 5,
                              }}
                            >
                              {!item.plant_Image_Master_DTOs ? (
                                <Image
                                  resizeMode="stretch"
                                  source={require("../../../assets/plantname.png")}
                                  style={{
                                    width: "100%",
                                    height: 50,
                                    borderRadius: 3,
                                  }}
                                />
                              ) : (
                                <Image
                                  resizeMode="stretch"
                                  source={{
                                    uri:
                                      item.plant_Image_Master_DTOs[0]
                                        .PIM_ImagePath,
                                  }}
                                  style={{
                                    width: "100%",
                                    height: 150,
                                    borderRadius: 3,
                                  }}
                                />
                              )}
                              {/* <Image
                                resizeMode="stretch"
                                source={item.PIM_ImagePath}
                                style={{ width: "100%", height: 150, borderRadius: 3 }}
                              /> */}

                              <View
                                style={{
                                  width: "100%",
                                  // backgroundColor: "pink",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: 40,
                                }}
                              >
                                <Text
                                  ellipsizeMode={"tail"}
                                  numberOfLines={2}
                                  style={{
                                    color: "black",
                                    // fontWeight: "bold",
                                  }}
                                >
                                  {item.Plant_Name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            // <TouchableOpacity
                            //   disabled={
                            //     this.props.plantid === item.Plant_PkeyID
                            //   }
                            //   onPress={() => this._AddToPlant(item)}
                            //   style={{
                            //     // backgroundColor: "pink",
                            //     borderColor:
                            //       this.props.plantid === item.Plant_PkeyID
                            //         ? "#30AD4A"
                            //         : "black",
                            //     borderWidth: 1,
                            //     justifyContent: "center",
                            //     alignItems: "center",
                            //     marginRight: 5,
                            //     padding: 4,
                            //     // width: "10%",
                            //   }}
                            // >
                            //   <View>
                            //     {item.plant_Image_Master_DTOs ? (
                            //       <Image
                            //         resizeMode="stretch"
                            //         style={{ height: 40, width: 40 }}
                            //         source={{
                            //           uri:
                            //             item.plant_Image_Master_DTOs[0]
                            //               .PIM_ImagePath,
                            //         }}
                            //       />
                            //     ) : (
                            //       <Image
                            //         resizeMode="stretch"
                            //         style={{ height: 40, width: 40 }}
                            //         source={require("../../../assets/leaftree.png")}
                            //       />
                            //     )}
                            //   </View>
                            //   <View
                            //     style={{
                            //       justifyContent: "center",
                            //       alignItems: "center",
                            //       // backgroundColor: "red",
                            //       width: "100%",
                            //     }}
                            //   >
                            //     <Text
                            //       ellipsizeMode={"tail"}
                            //       numberOfLines={2}
                            //       style={{
                            //         color:
                            //           this.props.plantid === item.Plant_PkeyID
                            //             ? "#30AD4A"
                            //             : "black",
                            //         width: 70,
                            //         // alignSelf: "center",
                            //       }}
                            //     >
                            //       {item.Plant_Name}
                            //     </Text>
                            //   </View>
                            // </TouchableOpacity>
                          );
                        }}
                        keyExtractor={() =>
                          "_" + Math.random().toString(36).substr(2, 9)
                        }
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#F7F8FD",
                      padding: 10,
                      marginTop: 30,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      flex: 1,
                    }}
                  >
                    <View style={{ marginTop: 10 }}>
                      {newplantarrar.length > 0 ? (
                        <View>
                          <Text>List</Text>
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            inverted
                            data={newplantarrar}
                            renderItem={({ item }) => {
                              return this.AddInput(item);
                            }}
                            keyExtractor={() =>
                              "_" + Math.random().toString(36).substr(2, 9)
                            }
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: "100%",
                            // backgroundColor: "pink",
                            // height: 200,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            No Spouse added
                          </Text>
                        </View>
                      )}
                    </View>
                    {/* {this.state.input.map((value, index) => {
                      return value;
                    })} */}
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
  customeview: state.customeReducer.customeview,
  plantid: state.plantReducer.plantid,
  spouseid: state.plantReducer.spouseid,
});

const mapDispatchToProps = {
  setPlantInfo,
  setPlantDesc,
  setPlantImage,
  setPlantImageArr,
  setCustomeView,
  setSpouseId,
  logoutAccount,
  setPlantId,
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
    paddingTop: 30,
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
    width: "100%",
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
