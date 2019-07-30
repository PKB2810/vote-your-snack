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
import SnackProvider from "./src/components/Provider";
import LoginPage from "./src/components/LoginPage";
import LandingPage from "./src/components/LandingPage";

const loginPageStyle = StyleSheet.create({
  loginPageParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  }
});
const AppStack = createStackNavigator(
  {
    LoginPage: LoginPage,
    LandingPage: LandingPage
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
