import React from "react";
import SnackContext from "../../context/SnackContext";
import { View, Text, TouchableOpacity } from "react-native";

const radioBtnStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ACACAC",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#794F9B"
  }
});

function RadioBtn(props) {
  return (
    <SnackContext.Consumer>
      {context => (
        <View>
          {context.voteOption.map((item, index) => {
            return (
              <View key={index} style={radioBtnStyle.buttonContainer}>
                <Text>{item}</Text>
                <TouchableOpacity
                  style={radioBtnStyle.circle}
                  onPress={() => context.castVote(item)}
                >
                  {context.vote === item && (
                    <View style={styles.checkedCircle} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </SnackContext.Consumer>
  );
}

export default RadioBtn;
