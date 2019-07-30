import React from "react";
import { GoogleSigninButton } from "react-native-google-signin";
import SnackContext from "../../../context/SnackContext";
import Header from "../Header";

class LoginPage extends React.Component {
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <>
            <Header>SnackVote</Header>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                context.signIn();

                this.props.navigation.navigate("LandingPage");
              }}
            />
          </>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default LoginPage;
