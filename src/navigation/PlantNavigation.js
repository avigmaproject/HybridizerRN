import React from "react";
import Plant from "../modules/plants/screens/Plant";
import Addplant from "../modules/plants/screens/Addplant";

import { createStackNavigator } from "@react-navigation/stack";
const plantStack = createStackNavigator();
export default function PlantNavigation() {
  return (
    <plantStack.Navigator screenOptions={{ headerShown: false }}>
      <plantStack.Screen name="PlantScreen" component={Plant} />
      <plantStack.Screen name="Addplant" component={Addplant} />
    </plantStack.Navigator>
  );
}
