import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import DeviceInfo from "react-native-device-info";
let hasNotch = DeviceInfo.hasNotch();
import { connect } from "react-redux";
import { gethomemyplants } from "../../../services/api.function";
import { setUserID } from "../../../store/action/auth/action";
import { setPlantId, logoutAccount } from "../../../store/action/plant/action";
import { FAB } from "react-native-paper";
// const DATA = [
//   {
//     id: "1",
//     title: "Top Flower",
//     image: require("../../../assets/image13.png"),
//     like: 12,
//     account: "minal",
//     profile: require("../../../assets/profile2.png"),
//   },
//   {
//     id: "2",
//     title: "Top Flower",
//     image: require("../../../assets/image14.png"),
//     like: 12,
//     account: "minal",
//     profile: require("../../../assets/profile.png"),
//   },
//   {
//     id: "3",
//     title: "Top Flower",
//     image: require("../../../assets/image15.png"),
//     like: 10,
//     account: "minal",
//     profile: require("../../../assets/profile.png"),
//   },
//   {
//     id: "4",
//     title: "Top Flower",
//     image: require("../../../assets/image16.png"),
//     like: 0,
//     account: "minal",
//     profile: require("../../../assets/profile.png"),
//   },
// ];
class Search extends Component {
  constructor(props) {
    super(props);
    this.userNameInputRef = React.createRef();
    this.state = {
      title: true,
      titlename: "",
      plant: [],
      backupplant: [],
      search: "",
    };
  }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._GetHomeMyPlants();
    });
  };

  searchText = (e) => {
    console.log("searchText", e);
    let text = e.toLowerCase();

    if (text) {
      const lowercasedFilter = text.toLowerCase();
      let filteredplant = this.state.backupplant.filter((item) => {
        return item.Plant_Name.toLowerCase().match(lowercasedFilter);
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
      // const filteredplant = this.state.backupplant.filter((item) => {
      //   return item.Plant_Name.toLowerCase().match(lowercasedFilter);
      // });
      // // const filteredplant = this.state.backupplant.filter((item) => {
      // //   console.log("inside", item);
      // //   return Object.keys(item).some(
      // //     (key) =>
      // //       typeof item[key] === "string" &&
      // //       item[key].toLowerCase().includes(lowercasedFilter)
      // //   );
      // // });
      // if (Array.isArray(filteredplant)) {
      //   console.log("after", filteredplant);
      //   this.setState({
      //     plant: filteredplant,
      //     plantname: e,
      //   });
      // } else {
      //   this.setState({ plantname: e, plant: this.state.backupplant });
      // }
      // if (filteredData.length > 0) {
      //   this.setState({
      //     plant: filteredData,
      //   });
      // }
    } else {
      this.setState({
        plant: this.state.backupplant,
      });
    }
    // let category = this.state.backupplant;
    // let filteredCategory = category.filter((item) => {
    //   return item.Plant_Name.toLowerCase().match(text);
    // });
    // console.log("filteredCategorybefore", filteredCategory);
    // if (Array.isArray(filteredCategory)) {
    //   console.log("after", filteredCategory);
    //   this.setState({
    //     plant: filteredCategory,
    //     search: e,
    //   });
    // } else {
    //   this.setState({
    //     plant: filteredCategory,
    //   });
    // }
  };
  _GetHomeMyPlants = async () => {
    this.setState({ isLoading: true });
    let data = {
      // Plant_User_PkeyID: this.props.userid,
      Type: 2,
    };
    console.log("_GetHomeMyPlants", data, this.props.token);
    await gethomemyplants(data, this.props.token)
      .then((res) => {
        console.log("res:gethomemyplants ", res[0]);
        this.setState({ plant: res[0], backupplant: res[0], isLoading: false });
      })
      .catch((error) => {
        if (error.response) {
          console.log("responce_error", error.response);
        } else if (error.request) {
          console.log("request error", error.request);
        }
      });
  };
  _ChangeTitle = (type) => {
    if (type) {
      this.props.setPlantTitle(this.state.titlename);
    }
    this.setState({ title: !this.state.title });
  };
  _SelectItem = (type, item) => {
    if (type) {
      this.props.setPlantId(item.Plant_PkeyID);
      this.props.navigation.navigate("Plant", { screen: "Addplant" });
    } else {
      this.props.setPlantId(0);
      this.props.logoutAccount();
      this.props.navigation.navigate("Plant", { screen: "Addplant" });
    }
  };

  _renderItem = (item) => {
    return (
      <Animatable.View
        animation={"fadeInLeftBig"}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => this._SelectItem(true, item)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* <Image
              resizeMode="stretch"
              source={item.profile}
              style={{ width: 50, height: 50 }}
            /> */}
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  lineHeight: 20,
                }}
              >
                {item.Plant_Name}
              </Text>
              <Text style={{ fontSize: 10, lineHeight: 20 }}>
                @{item.Cat_Name}
              </Text>
            </View>
          </View>
          <Feather name={"more-vertical"} size={25} color="#ACACAC" />
        </TouchableOpacity>
        {!item.PIM_ImagePath ? (
          <Image
            resizeMode="cover"
            source={require("../../../assets/plantname.png")}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            resizeMode="cover"
            source={{ uri: item.PIM_ImagePath }}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 3,
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
            backgroundColor: "#fff",
            shadowOffset: { width: 0.1, height: 0.1 },
            shadowColor: "gray",
            shadowOpacity: 0.5,
            elevation: 1,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            justifyContent: "space-between",
          }}
        >
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 20,
                width: 50,
                justifyContent: "space-around",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Entypo name={"heart"} size={22} color="#30AD4A" />
              <Text style={{ fontSize: 15 }}>{item.like}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 20,
                width: 50,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={"chatbubble-ellipses-outline"}
                size={20}
                color="#ACACAC"
              />
              <Text style={{ fontSize: 15 }}>{item.like}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 25,
                width: 50,
                justifyContent: "space-around",
                alignItemse: "center",
              }}
            >
              <Entypo name={"share"} size={20} color="#ACACAC" />
            </View>
          </View>
          <View>
            <Octicons name={"bookmark"} size={20} color="#ACACAC" />
          </View> */}
        </View>
      </Animatable.View>
    );
  };
  render() {
    console.log(this.props.plantid);
    return (
      <View style={{ height: "100%" }}>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <Spinner visible={this.state.isLoading} />

          <View>
            <Image
              resizeMode="stretch"
              source={require("../../../assets/Main.png")}
              style={{ width: "100%", height: hasNotch ? 200 : 150 }}
            />
            <View
              style={{
                position: "absolute",
                top: hasNotch ? 50 : 20,
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
                    marginHorizontal: 10,
                    // backgroundColor: "red",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{ fontSize: 25, color: "black", fontWeight: "bold" }}
                  >
                    Search
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  marginTop: 20,
                  marginRight: 30,
                }}
              >
                <View
                  style={{
                    width: "90%",
                    // backgroundColor: "pink",
                    paddingLeft: 20,
                    height: 50,
                  }}
                >
                  <TextInput
                    style={{ height: 50, color: "black" }}
                    placeholder="Search by plant name"
                    onChangeText={(search) => {
                      this.searchText(search);
                      this.setState({ search });
                    }}
                    value={this.state.search}
                    autoFocus={true}
                  />
                </View>
                <View
                  style={{
                    width: "10%",
                    // backgroundColor: "red",
                  }}
                >
                  <Feather name={"search"} size={25} color="#ACACAC" />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                paddingVertical: 20,
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
                paddingHorizontal: 10,
              }}
            >
              <FlatList
                data={this.state.plant}
                renderItem={({ item }) => {
                  return this._renderItem(item);
                }}
                ListHeaderComponent={() => {
                  return <View></View>;
                }}
                ListFooterComponent={() => {
                  return <View></View>;
                }}
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
                keyExtractor={(item) => item.Plant_PkeyID}
              />
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => this._SelectItem(false, 0)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  plantid: state.plantReducer.plantid,
});
const mapDispatchToProps = {
  setPlantId,
  logoutAccount,
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#30AD4A",
  },
});
