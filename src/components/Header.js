import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import DeviceInfo from "react-native-device-info";
let hasNotch = DeviceInfo.hasNotch();
export default class Header extends Component {
  render() {
    // console.log("===>333", this.props.onpressedit);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginTop: hasNotch && !this.props.logout ? 40 : 30,
          // backgroundColor: "pink",
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            // padding: 1,
          }}
        >
          <Icon name="chevron-back-outline" size={30} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          {this.props.edit && (
            <TouchableOpacity
              style={{
                marginRight: 10,
                // backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                padding: 1,
              }}
              onPress={this.props.onpressedit}
            >
              <AntDesign name="edit" size={30} color={"black"} />
            </TouchableOpacity>
          )}
          {this.props.share && (
            <TouchableOpacity
              style={{
                marginRight: 10,
                // backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                padding: 1,
              }}
              onPress={this.props.onpressshare}
            >
              <Icon name="share-social-outline" size={30} color="black" />
            </TouchableOpacity>
          )}
          {this.props.logout && (
            <TouchableOpacity
              style={{
                marginRight: 10,
                // backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                padding: 1,
              }}
              onPress={this.props.Logout}
            >
              <Entypo name="log-out" size={30} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
