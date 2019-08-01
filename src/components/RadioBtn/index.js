import React from "react";
import SnackContext from "../../../context/SnackContext";
import { View, Text, Button, StyleSheet } from "react-native";

const voteBtnStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30
  },
  btnStyle: {
    width: "20%",
    height: 48
  }
});

function RadioBtn(props) {
  return (
    <SnackContext.Consumer>
      {context => (
        <View style={voteBtnStyle.buttonContainer}>
          {context.voteOption.map((item, index) => {
            return (
              <View key={index} style={voteBtnStyle.btnStyle}>
                <Button title={item} onPress={() => context.castVote(item)}>
                  {context.vote === item && <View />}
                </Button>
              </View>
            );
          })}
        </View>
      )}
    </SnackContext.Consumer>
  );
}

export default RadioBtn;
