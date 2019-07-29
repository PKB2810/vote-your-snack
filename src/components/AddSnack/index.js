import React from "react";
import { View } from "react-native";
import TextBox from "../TextBox";
import TextContent from "../TextContent";
import NotifyBtn from "../NotifyBtn";
import SnackContext from "../../context/SnackContext";

const adminPageStyle = StyleSheet.create({
  adminParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});
class AdminPage extends React.Component {
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <View style={adminPageStyle.adminParent}>
            <TextContent>Today's snack</TextContent>
            <TextBox value={context.snackName} setValue={context.setSnack} />
            <NotifyBtn pressHandler={context.onNotify} />
            <TextContent>Number of votes:{context.noOfVotes}</TextContent>
          </View>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default AdminPage;
