import React from "react";
import { View, StyleSheet, Button } from "react-native";
import TextBox from "../TextBox";
import TextContent from "../TextContent";
import NotifyBtn from "../NotifyBtn";
import SnackContext from "../../../context/SnackContext";

const adminPageStyle = StyleSheet.create({
  adminParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});
class AddSnackByAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { snackName: "" };
  }
  setSnack = text => {
    this.setState({
      snackName: text
    });
  };
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <>
            <Button
              title="Sign Out"
              onPress={async () => {
                await context.signOut();

                this.props.navigation.navigate("LoginPage");
              }}
            />
            <View style={adminPageStyle.adminParent}>
              <TextContent>Today's snack</TextContent>
              <TextBox value={this.state.snackName} setValue={this.setSnack} />
              <NotifyBtn
                pressHandler={() => {
                  context.onNotify(this.state.snackName);
                  this.props.navigation.navigate("LandingPage");
                }}
              />
              <TextContent>
                Number of people want to have it:{context.noOfYesVotes}
              </TextContent>
            </View>
          </>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default AddSnackByAdmin;
