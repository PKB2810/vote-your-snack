import React from "react";
import { View } from "react-native";
import TextContent from "../TextContent";
import RadioBtn from "../RadioBtn";

const userPageStyle = StyleSheet.create({
  userParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});
class DisplaySnack extends React.Component {
  render() {
    return (
      <View style={userPageStyle.adminParent}>
        <TextContent>Today's snack</TextContent>
        <TextContent />
        <TextContent>Would you like to have it?</TextContent>
        <RadioBtn />
      </View>
    );
  }
}

export default DisplaySnack;
