import React from "react";
import { AuthNavigation } from "./src/navigation/AuthStack";
import { StatusBar, StyleSheet, View } from "react-native";
import MyTabs from "./src/navigation/TabNavigation";
import store, { persistor } from "./src/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar
      hidden
      translucent
      backgroundColor={backgroundColor}
      {...props}
    />
  </View>
);
function App() {
  const loggedin = useSelector((state) => state.authReducer.loggedin);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden />
        {/* <MyStatusBar
          backgroundColor="#30AD4A"
          barStyle="light-content"
          animated={true}
        /> */}
        {loggedin ? <MyTabs /> : <AuthNavigation />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#30AD4A",
    height: APPBAR_HEIGHT,
  },
});
