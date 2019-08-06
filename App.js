/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { AsyncStorage } from "react-native";
import SnackProvider from "./src/components/Provider";
import LoginPage from "./src/components/LoginPage";
import LandingPage from "./src/components/LandingPage";
import DisplaySnackToUser from "./src/components/DisplaySnackToUser";
import AddSnackByAdmin from "./src/components/AddSnackByAdmin";

const loginPageStyle = StyleSheet.create({
  loginPageParent: {
    width: "100%",
    height: "100%"
  }
});
const currentUser = null;
console.log(currentUser);
getCurrentUser = async () => {
  try {
    currentUser = await AsyncStorage.getItem("currentUser");
    console.log(currentUser);
  } catch (error) {
    // Error retrieving data
    Alert.alert(JSON.stringify(error));
  }
};
const AdminTab = createBottomTabNavigator({
  AddSnackByAdmin: AddSnackByAdmin,
  DisplaySnackToUser: DisplaySnackToUser
});
const AppStack = createStackNavigator(
  {
    LoginPage: LoginPage,
    AdminTab: AdminTab,
    DisplaySnackToUser: DisplaySnackToUser
  },
  {
    initialRouteName: "LoginPage" // this.getCurrentUser() !== null ? "DisplaySnackToUser" :
  }
);
const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    return (
      <SnackProvider>
        <AppContainer style={loginPageStyle.loginPageParent} />
      </SnackProvider>
    );
  }
}
