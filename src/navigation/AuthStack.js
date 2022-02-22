import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Welcome from "../modules/welcome/Welcome";
import SignIn from "../modules/auth/screens/SignIn";
import SignUp from "../modules/auth/screens/SignUp";
import ForgotPassword from "../modules/auth/screens/ForgotPassword";
import ResetPassword from "../modules/auth/screens/ResetPassword";

import { createStackNavigator } from "@react-navigation/stack";
const AuthStack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  );
};
