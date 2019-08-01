import React from "react";
import { StyleSheet, Text } from "react-native";

const headingStyle = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});
function Header(props) {
  return <Text style={headingStyle.textStyle}>{props.children}</Text>;
}

export default Header;
