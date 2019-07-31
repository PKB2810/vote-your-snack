/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AsyncStorage } from "react-native";
import SnackProvider from "./src/components/Provider";
import LoginPage from "./src/components/LoginPage";
import LandingPage from "./src/components/LandingPage";
import DisplaySnackToUser from "./src/components/DisplaySnackToUser";
import AddSnackByAdmin from "./src/components/AddSnackByAdmin";

const loginPageStyle = StyleSheet.create({
  loginPageParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  }
});
getCurrentUser = async () => {
  try {
    const currentUser = await AsyncStorage.getItem("currentUser");
    return currentUser;
  } catch (error) {
    // Error retrieving data
    alert.alert(JSON.stringify(error));
  }
};
const AppStack = createStackNavigator(
  {
    LoginPage: LoginPage,
    LandingPage: LandingPage,
    DisplaySnackToUser: DisplaySnackToUser,
    AddSnackByAdmin: AddSnackByAdmin
  },
  {
    initialRouteName: "LoginPage"
  }
);
const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    return (
      <SnackProvider>
        <AppContainer />
      </SnackProvider>
    );
  }
}
