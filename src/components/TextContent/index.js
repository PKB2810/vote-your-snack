import React from "react";
import { Text, StyleSheet } from "react-native";

const textContent = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});
function TextContent(props) {
  return <Text style={textContent.textStyle}>{props.children}</Text>;
}

export default TextContent;
