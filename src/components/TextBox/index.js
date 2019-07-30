import React from "react";
import { TextInput } from "react-native";

function TextBox(props) {
  return <TextInput value={props.value} onChangeText={props.setValue} />;
}

export default TextBox;
