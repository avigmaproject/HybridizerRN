import React from "react";
import ExploreNavigation from "./ExploreNavigation";
import ProfileNavigation from "./ProfileNavigation";
import PotNavigation from "./PotNavigation";
import PlantNavigation from "./PlantNavigation";
import SearchNavigation from "./SearchNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let image;
          if (route.name === "Explore") {
            image = focused
              ? require("../assets/explore_active.png")
              : require("../assets/explore_deactive.png");
          } else if (route.name === "Plant") {
            image = focused
              ? require("../assets/plants_active.png")
              : require("../assets/plants_deactive.png");
          } else if (route.name === "Pot") {
            image = focused
              ? require("../assets/pats_active.png")
              : require("../assets/pet_deactive.png");
          } else if (route.name === "Search") {
            image = focused
              ? require("../assets/search_active.png")
              : require("../assets/search_deactive.png");
          } else if (route.name === "Profile") {
            image = focused
              ? require("../assets/account_active.png")
              : require("../assets/user_deactive.png");
          }
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{ height: 35, width: 35 }}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          paddingTop: 10,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreNavigation} />
      <Tab.Screen name="Plant" component={PlantNavigation} />
      <Tab.Screen name="Pot" component={PotNavigation} />
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
}
