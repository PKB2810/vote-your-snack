import React from "react";
import { GoogleSignin } from "react-native-google-signin";
import { Alert } from "react-native";
import SnackContext from "../../../context/SnackContext";
import { AsyncStorage } from "react-native";

class SnackProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackName: "",
      noOfYesVotes: 0,
      noOfYNoVotes: 0,
      vote: "",
      voteOption: ["Yes", "No"],
      currentUser: null,
      isAdmin: false
    };
  }
  componentDidMount() {
    GoogleSignin.configure();
  }

  persistUser = async () => {
    try {
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(this.state.currentUser.name)
      );
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      // Error saving data
    }
  };

  clearUser = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
    } catch (exception) {
      Alert.alert(JSON.stringify(error));
    }
  };
  promisedSetState = user => {
    return new Promise(resolve => {
      this.setState({ currentUser: user }, () => {
        resolve();
      });
    });
  };
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      let userInfo = await GoogleSignin.signIn();
      //let userInfo = await user;
      //Alert.alert("signed in");
      // Alert.alert(JSON.stringify(userInfo.user.name));
      console.log(JSON.stringify(userInfo.user.name));
      //allow navigation only after currentUser is set
      await this.promisedSetState(userInfo.user);
      this.persistUser();
      //this.setState({ currentUser: JSON.stringify(userInfo.user) });
      //
    } catch (error) {
      console.log(error);
      Alert.alert(JSON.stringify(error));
      // Alert.alert(error);
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await this.promisedSetState(null);
      // this.clearUser();
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
      Alert.alert(JSON.stringify(error));
    }
  };
  onNotify = snackName => {
    this.setState(
      {
        snackName: snackName
      },
      () => {
        Alert.alert("Notified");
      }
    );
  };
  setIsAdmin = () => {
    this.setState({ isAdmin: !this.state.isAdmin });
  };
  castVote = vote => {
    this.setState({ vote: vote }, () => {
      if (this.state.vote === "Yes") {
        this.setState({
          noOfYesVotes: this.state.noOfYesVotes + 1,
          noOfYNoVotes: this.state.noOfYNoVotes - 1
        });
      } else {
        this.setState({
          noOfYesVotes: this.state.noOfYesVotes - 1,
          noOfYNoVotes: this.state.noOfYNoVotes + 1
        });
      }
    });
  };

  render() {
    return (
      <SnackContext.Provider
        value={{
          snackName: this.state.snackName,
          noOfYesVotes: this.state.noOfYesVotes,
          vote: this.state.vote,
          voteOption: this.state.voteOption,
          setSnack: this.setSnack,
          isAdmin: this.state.isAdmin,
          setIsAdmin: this.setIsAdmin,
          onNotify: this.onNotify,
          castVote: this.castVote,
          signIn: this.signIn,
          signOut: this.signOut,
          currentUser: this.state.currentUser
        }}
      >
        {this.props.children}
      </SnackContext.Provider>
    );
  }
}
export default SnackProvider;
