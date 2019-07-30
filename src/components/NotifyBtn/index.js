import React from "react";
import { Button } from "react-native";

function NotifyBtn(props) {
  return <Button onPress={props.pressHandler} title="Notify" color="#841584" />;
}

export default NotifyBtn;
