import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import DeviceInfo from "react-native-device-info";
import {
  getusermasterdata,
  gethomemyplants,
} from "../../../services/api.function";
import { connect } from "react-redux";
import { setUserID, setValidUserID } from "../../../store/action/auth/action";
import {
  setPlantId,
  logoutAccount,
  setCopyPlant,
} from "../../../store/action/plant/action";
import InputField from "../../../components/InputField";
import Spinner from "react-native-loading-spinner-overlay";
let hasNotch = DeviceInfo.hasNotch();
// const DATA = [
//   {
//     id: "1",
//     title: "First Item",
//     image: require("../../../assets/image1.png"),

//     like: 14,
//     account: "minal",
//   },
//   {
//     id: "2",
//     title: "Second Item",
//     image: require("../../../assets/image2.png"),

//     like: 11,
//     account: "minal",
//   },
//   {
//     id: "3",
//     title: "Top Flower",
//     image: require("../../../assets/image3.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "4",
//     title: "Top Flower",
//     image: require("../../../assets/image4.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "5",
//     title: "Top Flower",
//     image: require("../../../assets/image5.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "6",
//     title: "Top Flower",
//     image: require("../../../assets/image6.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "7",
//     title: "Top Flower",
//     image: require("../../../assets/image7.png"),
//     like: 12,
//     account: "minal",
//   },

//   {
//     id: "8",
//     title: "Top Flower",
//     image: require("../../../assets/image8.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "9",
//     title: "Top Flower",
//     image: require("../../../assets/image9.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "10",
//     title: "Top Flower",
//     image: require("../../../assets/image10.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "11",
//     title: "Top Flower",
//     image: require("../../../assets/image11.png"),
//     like: 12,
//     account: "minal",
//   },
//   {
//     id: "12",
//     title: "Top Flower",
//     image: require("../../../assets/image12.png"),
//     like: 12,
//     account: "minal",
//   },
// ];
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0,
      plant: [],
      modalVisible: false,
      backupplant: [],
      plantname: "",
      isLoading: false,
    };
  }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._GetUserMasterData();
      this._GetHomeMyPlants();
    });
  };

  _GetHomeMyPlants = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 1,
    };
    console.log("_GetHomeMyPlantsExpolre", data, this.props.token);
    await gethomemyplants(data, this.props.token)
      .then((res) => {
        console.log("res:gethomemyplantsexplore ", res[0]);
        this.setState({
          plant: res[0] ? res[0] : [],
          backupplant: res[0],
          isLoading: false,
        });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        if (error.response) {
          console.log("responce_error", error.response);
        } else if (error.request) {
          console.log("request error", error.request);
        }
      });
  };
  _GetUserMasterData = async () => {
    // this.setState({ isLoading: true });
    let data = {
      Type: 2,
    };
    console.log("_GetUserMasterData", data, this.props.token);
    await getusermasterdata(data, this.props.token)
      .then((res) => {
        console.log("res:getusermasterdata ", res[0][0].User_PkeyID);
        this.setState({ userid: res[0][0].User_PkeyID, isLoading: false });
        this.props.setUserID(res[0][0].User_PkeyID);
      })
      .catch((error) => {
        if (error.response) {
          console.log("responce_error", error.response);
        } else if (error.request) {
          console.log("request error", error.request);
        }
      });
  };
  _SelectItem = (type, item) => {
    if (type) {
      if (item.Plant_User_PkeyID === this.props.userid) {
        this.props.setValidUserID(true);
      } else {
        this.props.setValidUserID(false);
      }
      this.props.setPlantId(item.Plant_PkeyID);
      this.props.navigation.navigate("Plant", { screen: "Addplant" });
    } else {
      this.props.setValidUserID(true);
      this.props.setPlantId(0);
      this.props.logoutAccount();
      this.props.navigation.navigate("Plant", { screen: "Addplant" });
    }
  };
  _SelectCategory = () => {
    var data = [...this.state.backupplant];
    this.setState({
      modalVisible: !this.state.modalVisible,
      plantname: "",
      plant: data,
    });
  };
  searchText = (e) => {
    console.log("searchText", e);
    let text = e.toLowerCase();
    let plant = this.state.backupplant;
    let filteredplant = plant.filter((item) => {
      return item.Plant_Name.toLowerCase().match(text);
    });
    console.log("filteredplantbefore", filteredplant);
    if (Array.isArray(filteredplant)) {
      console.log("after", filteredplant);
      this.setState({
        plant: filteredplant,
        plantname: e,
      });
    } else {
      this.setState({ plantname: e, plant: this.state.backupplant });
    }
  };
  _renderModal = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}
        >
          <ScrollView>
            <View
              style={{
                marginTop: 150,
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                width: "90%",
                paddingBottom: 30,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: 20,
                  paddingTop: 10,
                }}
              >
                <Entypo
                  name="circle-with-cross"
                  size={18}
                  color={"black"}
                  onPress={() => this._SelectCategory()}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  // backgroundColor: "pink",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "85%",
                    paddingLeft: 20,
                  }}
                >
                  <InputField
                    onChangeText={(plantname) => {
                      this.searchText(plantname);
                      // this.setState({ categoryname });
                    }}
                    value={this.state.plantname}
                    placeholder={"Plant name"}
                    autoFocus={true}
                  />
                </View>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      plantname: "",
                    })
                  }
                  style={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name={"caretright"} size={25} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };
  render() {
    return (
      <View style={{ height: "100%" }}>
        {/* <ScrollView keyboardShouldPersistTaps={"handled"}> */}
        <Spinner visible={this.state.isLoading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require("../../../assets/Main.png")}
            style={{ width: "100%", height: hasNotch ? 285 : 250 }}
          />
          <View
            style={{
              position: "absolute",
              top: hasNotch ? 50 : 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 50,
              }}
            >
              <View
                style={{
                  // backgroundColor: "red",
                  justifyContent: "center",
                  width: "55%",
                  paddingLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "black",
                    fontWeight: "600",
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  Explore
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "45%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={styles.icon}>
                  <AntDesign name={"bells"} size={25} color="#ACACAC" />
                </View>
                <TouchableOpacity
                  onPress={() => this._SelectCategory()}
                  style={styles.icon}
                >
                  <Feather name={"search"} size={25} color="#ACACAC" />
                </TouchableOpacity>
                <View style={styles.icon}>
                  <Feather name={"info"} size={25} color="#ACACAC" />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                marginTop: 30,
                paddingHorizontal: 10,
                marginHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  width: "65%",
                  // backgroundColor: "red",
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#30AD4A", marginLeft: 20 }}
                >
                  Plant Story{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 10,
                    color: "black",
                    fontWeight: "bold",
                    // fontFamily: "Poppins-Bold",
                  }}
                >
                  Help Your Plant Survive When You Are Away
                </Text>
              </View>
              <View style={{ width: "35%" }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/leaf.png")}
                  style={{ width: "90%", height: 100 }}
                />
              </View>
            </View>
          </View>

          <Animatable.View
            animation={"fadeInUpBig"}
            style={{ marginHorizontal: 10 }}
          >
            <FlatList
              numColumns={2}
              data={this.state.plant}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: "pink",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <Text style={{ fontSize: 50, fontWeight: "bold" }}>
                      No Plant Found
                    </Text>
                  </View>
                );
              }}
              ListHeaderComponent={() => {
                return (
                  <>
                    {this.state.plant.length > 0 && (
                      <View>
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          Recommended Post
                        </Text>
                      </View>
                    )}
                  </>
                );
              }}
              ListFooterComponent={() => {
                return <View></View>;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this._SelectItem(true, item)}
                    style={{
                      width: "50%",
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      // paddingHorizontal: 5,
                      marginTop: 10,
                      marginRight: 5,
                      shadowOffset: { width: 1, height: 1 },
                      shadowColor: "gray",
                      shadowOpacity: 0.9,
                      elevation: 5,
                    }}
                  >
                    {!item.PIM_ImagePath ? (
                      <Image
                        resizeMode="stretch"
                        source={require("../../../assets/plantname.png")}
                        style={{
                          width: "100%",
                          height: 150,
                          borderRadius: 3,
                        }}
                      />
                    ) : (
                      <Image
                        resizeMode="stretch"
                        source={{ uri: item.PIM_ImagePath }}
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
                        // backgroundColor: "pink",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <View>
                        <Text style={{ color: "black", fontWeight: "bold" }}>
                          {item.Plant_Name}
                        </Text>
                        <Text style={{ fontSize: 10 }}>@{item.Cat_Name}</Text>
                      </View>
                      {/* <View
                          style={{
                            flexDirection: "row",
                            borderWidth: 1,
                            borderColor: "lightgray",
                            height: 20,
                            width: 40,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Entypo name={"heart"} size={15} color="#30AD4A" />
                          <Text style={{ fontSize: 10 }}>{item.like}</Text>
                        </View> */}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.Plant_PkeyID}
            />
          </Animatable.View>
        </View>
        {/* </ScrollView> */}
        <FAB
          style={styles.fab}
          // small
          icon="plus"
          onPress={() => this._SelectItem(false, 0)}
        />
        {this._renderModal()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#fff",
    borderRadius: 45,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowColor: "gray",
    shadowOpacity: 0.5,
    elevation: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#30AD4A",
    zIndex: 1,
  },
});
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  userid: state.authReducer.userid,
  isvalid: state.authReducer.isvalid,
  copyplant: state.plantReducer.copyplant,
});

const mapDispatchToProps = {
  setUserID,
  setPlantId,
  logoutAccount,
  setValidUserID,
  setCopyPlant,
};
export default connect(mapStateToProps, mapDispatchToProps)(Explore);
