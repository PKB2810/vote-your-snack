import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import TextBox from "../TextBox";
import TextContent from "../TextContent";
import NotifyBtn from "../NotifyBtn";
import SnackContext from "../../../context/SnackContext";

const adminPageStyle = StyleSheet.create({
  adminParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  btnStyle: {
    width: 192,
    height: 48
  },
  signOutBtnStyle: {
    width: 192,
    height: 48,
    alignSelf: "flex-end"
  }
});

class AddSnackByAdmin extends React.Component {
  static contextType = SnackContext;
  constructor(props, context) {
    super(props, context);
    const snackName = this.context.snackName;
    this.state = { snackName: snackName };
  }
  componentDidMount() {
    // this.context.checkIfUserSignedIn();
    //this.context.getPersistedData();
    this.context.getSnack();
    this.context.getVote();
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
            <View style={adminPageStyle.signOutBtnStyle}>
              <Button
                title="Sign Out"
                onPress={async () => {
                  await context.signOut();

                  this.props.navigation.navigate("LoginPage");
                }}
              />
            </View>
            <View style={adminPageStyle.adminParent}>
              <TextContent>Today's snack</TextContent>
              <TextBox value={this.state.snackName} setValue={this.setSnack} />
              {this.state.snackName.trim() !== "" && (
                <NotifyBtn
                  pressHandler={() => {
                    context.onNotify(this.state.snackName);
                    // this.props.navigation.navigate("LandingPage");
                  }}
                />
              )}

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
