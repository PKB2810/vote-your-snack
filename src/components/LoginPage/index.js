import React from "react";
import { View, StyleSheet, CheckBox, Text } from "react-native";
import { GoogleSigninButton } from "react-native-google-signin";
import SnackContext from "../../../context/SnackContext";
import Header from "../Header";

const loginStyle = StyleSheet.create({
  loginParent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  signInBtnStyle: {
    width: 192,
    height: 48
  },
  checkBoxStyle: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  }
});
class LoginPage extends React.Component {
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <View style={loginStyle.loginParent}>
            <Header style={loginStyle.textStyle}>SnackVote</Header>
            <GoogleSigninButton
              style={loginStyle.signInBtnStyle}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={async () => {
                await context.signIn();
                if (context.isAdmin) {
                  this.props.navigation.navigate("AddSnackByAdmin");
                } else {
                  this.props.navigation.navigate("DisplaySnackToUser");
                }
              }}
            />
            <View style={loginStyle.checkBoxStyle}>
              <CheckBox
                title="Are you an admin?"
                onValueChange={context.setIsAdmin}
                value={context.isAdmin}
              />
              <Text style={loginStyle.textStyle}>Are you an admin?</Text>
            </View>
          </View>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default LoginPage;
