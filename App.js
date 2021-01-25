/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import LandingPage from "./src/components/LandingPage";

const landingPageStyle = StyleSheet.create({
  landingPageParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  }
});
const App = () => {
  return (
    <View style={landingPageStyle.landingPageParent}>
      <LandingPage />
    </View>
  );
};

export default App;
