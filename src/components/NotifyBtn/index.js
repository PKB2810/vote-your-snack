import React from "react";
import { Button, StyleSheet, View } from "react-native";

const notifyBtn = StyleSheet.create({
  btnStyle: {
    width: "40%",
    height: "20%",
    alignSelf: "center"
  },

  textBoxStyle: {
    width: "90%",
    borderColor: "black",
    borderRadius: 10
  }
});
function NotifyBtn(props) {
  return (
    <View style={notifyBtn.btnStyle}>
      <Button onPress={props.pressHandler} title="Notify" />
    </View>
  );
}

export default NotifyBtn;
