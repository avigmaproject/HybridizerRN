import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import DeviceInfo from "react-native-device-info";
let hasNotch = DeviceInfo.hasNotch();
const DATA = [
  {
    id: "1",
    title: "First Item",
    image: require("../../../assets/image1.png"),

    like: 14,
    account: "minal",
  },
  {
    id: "2",
    title: "Second Item",
    image: require("../../../assets/image2.png"),

    like: 11,
    account: "minal",
  },
  {
    id: "3",
    title: "Top Flower",
    image: require("../../../assets/image3.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "4",
    title: "Top Flower",
    image: require("../../../assets/image4.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "5",
    title: "Top Flower",
    image: require("../../../assets/image5.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "6",
    title: "Top Flower",
    image: require("../../../assets/image6.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "7",
    title: "Top Flower",
    image: require("../../../assets/image7.png"),
    like: 12,
    account: "minal",
  },

  {
    id: "8",
    title: "Top Flower",
    image: require("../../../assets/image8.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "9",
    title: "Top Flower",
    image: require("../../../assets/image9.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "10",
    title: "Top Flower",
    image: require("../../../assets/image10.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "11",
    title: "Top Flower",
    image: require("../../../assets/image11.png"),
    like: 12,
    account: "minal",
  },
  {
    id: "12",
    title: "Top Flower",
    image: require("../../../assets/image12.png"),
    like: 12,
    account: "minal",
  },
];
export default class Explore extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Image
              resizeMode="stretch"
              source={require("../../../assets/Main.png")}
              style={{ width: "100%", height: hasNotch ? 300 : 250 }}
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
                    style={{ fontSize: 25, color: "black", fontWeight: "bold" }}
                  >
                    Explore
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "red",
                    width: "45%",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.icon}>
                    <AntDesign name={"bells"} size={25} color="#ACACAC" />
                  </View>
                  <View style={styles.icon}>
                    <Feather name={"search"} size={25} color="#ACACAC" />
                  </View>
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
              <View>
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 13 }}
                >
                  Recommended Post
                </Text>
              </View>
              <FlatList
                numColumns={2}
                data={DATA}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: "50%",
                        backgroundColor: "#fff",
                        borderRadius: 5,
                        // paddingHorizontal: 5,
                        marginTop: 10,
                        marginRight: 5,
                      }}
                    >
                      <Image
                        resizeMode="stretch"
                        source={item.image}
                        style={{ width: "100%", height: 150, borderRadius: 3 }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 10,
                        }}
                      >
                        <View>
                          <Text style={{ color: "black", fontWeight: "bold" }}>
                            {item.title}
                          </Text>
                          <Text style={{ fontSize: 10 }}>@{item.account}</Text>
                        </View>
                        <View
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
                        </View>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </Animatable.View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          // small
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
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
  },
});
