import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import * as Animatable from "react-native-animatable";
import DeviceInfo from "react-native-device-info";
let hasNotch = DeviceInfo.hasNotch();
import { FAB } from "react-native-paper";
const DATA = [
  {
    id: "1",
    title: "Top Flower",
    image: require("../../../assets/image13.png"),
    like: 12,
    account: "minal",
    profile: require("../../../assets/profile2.png"),
  },
  {
    id: "2",
    title: "Top Flower",
    image: require("../../../assets/image14.png"),
    like: 12,
    account: "minal",
    profile: require("../../../assets/profile.png"),
  },
  {
    id: "3",
    title: "Top Flower",
    image: require("../../../assets/image15.png"),
    like: 10,
    account: "minal",
    profile: require("../../../assets/profile.png"),
  },
  {
    id: "4",
    title: "Top Flower",
    image: require("../../../assets/image16.png"),
    like: 0,
    account: "minal",
    profile: require("../../../assets/profile.png"),
  },
];
export default class Search extends Component {
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
        <View
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
            <Image
              resizeMode="stretch"
              source={item.profile}
              style={{ width: 50, height: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  lineHeight: 20,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ fontSize: 10, lineHeight: 20 }}>
                @{item.account}
              </Text>
            </View>
          </View>
          <Feather name={"more-vertical"} size={25} color="#ACACAC" />
        </View>
        <Image
          resizeMode="stretch"
          source={item.image}
          style={{ width: "100%", height: 200 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
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
          <View
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
          </View>
        </View>
      </Animatable.View>
    );
  };
  render() {
    return (
      <View>
        <ScrollView>
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
                data={DATA}
                renderItem={({ item }) => {
                  return this._renderItem(item);
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#30AD4A",
  },
});
