import React from "react";
import { GoogleSignin } from "react-native-google-signin";
import { Alert } from "react-native";
import SnackContext from "../../../context/SnackContext";

class SnackProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackName: "",
      noOfVotes: 0,
      vote: "",
      voteOption: ["Yes", "No"],
      currentUser: null
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: [],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        "964816287759-n2h7c284v5d4i4adfo7fsc7aodq29cl2.apps.googleusercontent.com"
    });
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ currentUser: JSON.stringify(userInfo) });
    } catch (error) {
      Alert.alert(error);
    }
  };

  setSnack = text => {
    this.setState({
      snackName: text
    });
  };

  onNotify = () => {
    //post snack name
  };
  castVote = vote => {
    this.setState({ vote: vote });
  };

  render() {
    return (
      <SnackContext.Provider
        value={{
          snackName: this.state.snackName,
          noOfVotes: this.state.noOfVotes,
          vote: this.state.vote,
          voteOption: this.state.voteOption,
          setSnack: this.setSnack,
          onNotify: this.onNotify,
          castVote: this.castVote,
          signIn: this.signIn,
          currentUser: this.state.currentUser
        }}
      >
        {this.props.children}
      </SnackContext.Provider>
    );
  }
}
export default SnackProvider;
