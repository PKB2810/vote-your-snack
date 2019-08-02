import React from "react";
import { View, Text, StyleSheet } from "react-native";

const textContent = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    height: "10%"
  }
});
function TextContent(props) {
  return <Text style={textContent.textStyle}>{props.children}</Text>;
}

export default TextContent;
