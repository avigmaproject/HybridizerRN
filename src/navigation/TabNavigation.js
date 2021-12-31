import React from "react";
import ExploreNavigation from "./ExploreNavigation";
import ProfileNavigation from "./ProfileNavigation";
import PotNavigation from "./PotNavigation";
import PlantNavigation from "./PlantNavigation";
import SearchNavigation from "./SearchNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          height: 55,
        },
      }}
    >
      <Tab.Screen name="Explore" component={ExploreNavigation} />
      <Tab.Screen name="Plant" component={PlantNavigation} />
      <Tab.Screen name="Pot" component={PotNavigation} />
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
}
