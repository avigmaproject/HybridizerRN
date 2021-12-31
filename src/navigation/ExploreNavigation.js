import React from "react";
import Explore from "../modules/explore/screens/Explore";
import { createStackNavigator } from "@react-navigation/stack";
const ExpolreStack = createStackNavigator();

export default function ExploreNavigation() {
  return (
    <ExpolreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExpolreStack.Screen name="ExploreScreen" component={Explore} />
    </ExpolreStack.Navigator>
  );
}
