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
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "90%",
    width: "100%"
  },
  btnStyle: {
    width: 192,
    height: 48
  },
  signOutBtnStyle: {
    width: 192,
    height: 48,
    alignSelf: "flex-end"
  },
  childContainerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "50%",
    width: "100%"
  }
});

class AddSnackByAdmin extends React.Component {
  static contextType = SnackContext;
  static navigationOptions = {
    title: "Admin"
  };
  constructor(props, context) {
    super(props, context);
    // const snackName = this.context.snackName;
    this.state = { snackName: "" };
  }
  componentDidMount() {
    // this.context.checkIfUserSignedIn();
    //this.context.getPersistedData();
    this.fetchData();
  }
  fetchData = async () => {
    await this.context.getSnack();
    await this.context.getVote();
    this.context.extrDataFromUserArr(this.context.currUserInfoArr);
    this.setState({
      snackName: this.context.snackName
    });
  };

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

              <View style={adminPageStyle.childContainerStyle}>
                <TextBox
                  value={this.state.snackName}
                  setValue={this.setSnack}
                />
                {this.state.snackName.trim() !== "" && (
                  <NotifyBtn
                    pressHandler={() => {
                      context.onNotify(this.state.snackName);
                      // this.props.navigation.navigate("LandingPage");
                    }}
                  />
                )}
              </View>

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
