import React from "react";
import SnackContext from "../../../context/SnackContext";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const voteBtnStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  btnStyle: {
    width: "20%",
    height: "35%",
    alignSelf: "center"
  }
});

class RadioBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "transparent"
    };
  }
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <View style={voteBtnStyle.buttonContainer}>
            {context.voteOption.map((item, index) => {
              return (
                <View key={index} style={voteBtnStyle.btnStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      context.castVote(item);
                    }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {context.vote === item && (
                      <View
                        style={{
                          backgroundColor: "green",
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "white"
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    )}
                    {context.vote !== item && (
                      <View
                        style={{
                          backgroundColor: "transparent",
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "black"
                          }}
                        >
                          {item}
                        </Text>
                      </View>
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
}

export default RadioBtn;
