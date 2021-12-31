import React from "react";
import Pots from "../modules/pots/screens/Pots";
import { createStackNavigator } from "@react-navigation/stack";
const PotStack = createStackNavigator();
export default function PotNavigation() {
  return (
    <PotStack.Navigator screenOptions={{ headerShown: false }}>
      <PotStack.Screen name="PotsScreen" component={Pots} />
    </PotStack.Navigator>
  );
}
