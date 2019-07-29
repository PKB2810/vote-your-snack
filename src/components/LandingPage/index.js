import React from "react";
import { StyleSheet, View } from "react-native";
import { GoogleSigninButton } from "react-native-google-signin";
import Header from "../Header";
const landingPageStyle = StyleSheet.create({
  landingPageParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  }
});
class LandingPage extends React.Component {
  render() {
    return (
      <View style={landingPageStyle.landingPageParent}>
        <Header>SnackVote</Header>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </View>
    );
  }
}

export default LandingPage;
