import React from "react";
import { TextInput, StyleSheet } from "react-native";

const txtBox = StyleSheet.create({
  textBoxStyle: {
    width: "90%",
    height: "30%",
    alignSelf: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#000000"
  }
});

function TextBox(props) {
  return (
    <TextInput
      style={txtBox.textBoxStyle}
      value={props.value}
      onChangeText={props.setValue}
      placeholder="Enter today's snack"
    />
  );
}

export default TextBox;
