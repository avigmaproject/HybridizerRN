import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { signout } from "../../../store/action/auth/action";
import { useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(signout());
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "pink" }}>
        <Button title="Logout" onPress={() => Logout()} />
      </View>
    </View>
  );
}
