import React from "react";
import Plant from "../modules/plants/screens/Plant";
import { createStackNavigator } from "@react-navigation/stack";
const plantStack = createStackNavigator();
export default function PlantNavigation() {
  return (
    <plantStack.Navigator screenOptions={{ headerShown: false }}>
      <plantStack.Screen name="PlantScreen" component={Plant} />
    </plantStack.Navigator>
  );
}
