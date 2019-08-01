import React from "react";
import { TextInput, StyleSheet } from "react-native";

const txtBox = StyleSheet.create({
  textBoxStyle: {
    width: "90%",
    height: 48,
    alignSelf: "center"
  }
});

function TextBox(props) {
  return (
    <TextInput
      style={txtBox.textBoxStyle}
      value={props.value}
      onChangeText={props.setValue}
    />
  );
}

export default TextBox;
