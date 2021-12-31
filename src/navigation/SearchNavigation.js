import React from "react";
import Search from "../modules/search/screens/Search";
import { createStackNavigator } from "@react-navigation/stack";
const SearchStack = createStackNavigator();
export default function SearchNavigation() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchScreen" component={Search} />
    </SearchStack.Navigator>
  );
}
