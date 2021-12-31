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
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import * as Animatable from "react-native-animatable";

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
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Image
              resizeMode="stretch"
              source={require("../../../assets/Main.png")}
              style={{ width: "100%", height: 150 }}
            />
            <View
              style={{
                position: "absolute",
                top: 20,
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
                  }}
                >
                  <TextInput style={{}} placeholder="Search by plant name" />
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
                        <Feather
                          name={"more-vertical"}
                          size={25}
                          color="#ACACAC"
                        />
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
                          elevation: 8,
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
                              alignItems: "center",
                            }}
                          >
                            <EvilIcons
                              name={"share-google"}
                              size={30}
                              color="#ACACAC"
                            />
                          </View>
                        </View>
                        <View style={{}}>
                          <Octicons
                            name={"bookmark"}
                            size={20}
                            color="#ACACAC"
                          />
                        </View>
                      </View>
                    </Animatable.View>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
      </SafeAreaView>
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
    elevation: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#30AD4A",
  },
});
