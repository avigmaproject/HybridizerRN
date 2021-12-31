import React from "react";
import Profile from "../modules/profile/screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";
const ProfileStack = createStackNavigator();
export default function ProfileNavigation() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    </ProfileStack.Navigator>
  );
}
