import React from "react";
import { GoogleSigninButton } from "react-native-google-signin";
import Header from "../Header";

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Header>SnackVote</Header>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </>
    );
  }
}

export default LandingPage;
