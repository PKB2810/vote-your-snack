import React from "react";
import {
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Alert,
  Text,
  TouchableOpacity
} from "react-native";
import { GoogleSignin } from "react-native-google-signin";

import SnackContext from "../../../context/SnackContext";
import TextContent from "../TextContent";
import RadioBtn from "../RadioBtn";
import Header from "../Header";

const userPageStyle = StyleSheet.create({
  userParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  signOutBtnStyle: {
    width: 192,
    height: 48,
    alignSelf: "flex-end"
  },
  btnStyle: {
    width: 192,
    height: 48,
    alignSelf: "center"
  },

  textBoxStyle: {
    width: "90%",
    borderColor: "black",
    borderRadius: 10
  }
});

class DisplaySnackToUser extends React.Component {
  static contextType = SnackContext;
  static navigationOptions = {
    title: "User"
  };
  componentDidMount() {
    // this.context.checkIfUserSignedIn();
    //this.context.getPersistedData();
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.fetchData();
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  fetchData = async () => {
    await this.context.getSnack();
    await this.context.getVote();
    this.context.extrDataFromUserArr(this.context.currUserInfoArr);
  };

  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <View style={userPageStyle.userParent}>
            <View style={userPageStyle.signOutBtnStyle}>
              <Button
                title="Sign Out"
                onPress={async () => {
                  await context.signOut();

                  this.props.navigation.navigate("LoginPage");
                }}
              />
            </View>

            {context.currentUser && (
              <Header>{"Welcome " + context.currentUser.name}</Header>
            )}

            <View style={userPageStyle.userParent}>
              <TextContent>Today's snack</TextContent>
              <TextContent>{context.snackName}</TextContent>
              <TextContent>Would you like to have it?</TextContent>
              <RadioBtn />
              <View style={userPageStyle.btnStyle}>
                <Button
                  title="Submit my Vote"
                  onPress={() => {
                    context.storeVote();
                    //  this.props.navigation.navigate("LandingPage");
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default DisplaySnackToUser;
