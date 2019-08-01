import React from "react";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { Alert } from "react-native";
import SnackContext from "../../../context/SnackContext";
import { AsyncStorage } from "react-native";

class SnackProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackName: "",
      noOfYesVotes: 0,
      noOfNoVotes: 0,
      vote: "",
      voteOption: ["Yes", "No"],
      currentUser: null,
      isAdmin: false,
      date: ""
    };
  }
  componentDidMount() {
    GoogleSignin.configure();
    this.setDate();
  }
  setDate = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    this.setState({ date: day + "/" + month + "/" + year });
  };
  persistUser = async () => {
    try {
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(this.state.currentUser)
      );
      await AsyncStorage.setItem("snackName", this.state.snackName);
      await AsyncStorage.setItem("vote", this.state.vote);
      await AsyncStorage.setItem("isAdmin", JSON.stringify(this.state.isAdmin));
      await AsyncStorage.setItem(
        "noOfYesVotes",
        JSON.stringify(this.state.noOfYesVotes)
      );
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      // Error saving data
    }
  };
  //may write sepaat for user and admin
  getPersistedData = async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
    const snackName = await AsyncStorage.getItem("snackName");
    const vote = await AsyncStorage.getItem("vote");
    const isAdmin = JSON.parse(await AsyncStorage.getItem("isAdmin"));
    const noOfYesVotes = JSON.parse(await AsyncStorage.getItem("noOfYesVotes"));
    this.setState({
      currentUser,
      snackName,
      vote,
      isAdmin,
      noOfYesVotes
    });
  };

  clearUser = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("logged out");
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
  checkIfUserSignedIn = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!isSignedIn) {
        Alert.alert(JSON.stringify(isSignedIn));
        const userInfo = await GoogleSignin.signInSilently();
        await this.promisedSetState(userInfo.user);
        Alert.alert(JSON.stringify(userInfo.user.name));
        this.persistUser();
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.signIn();
      }
    }
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      let userInfo = await GoogleSignin.signIn();

      console.log(JSON.stringify(userInfo.user.name));
      //allow navigation only after currentUser is set
      await this.promisedSetState(userInfo.user);
      // this.persistUser();
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
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      await this.promisedSetState(null);
      // this.clearUser();
    } catch (error) {
      //console.error(error);
      //Alert.alert(JSON.stringify(error));
    }
  };

  getSnack = () => {
    fetch("https://snack-app-5cec3.firebaseio.com/snack.json")
      .then(response => response.json())
      .then(data => {
        let snackInfoArr = [];
        for (let key in data) {
          snackInfoArr.push({
            date: data[key].date,
            noOfYesVotes: data[key].noOfYesVotes,
            snackName: data[key].snackName
          });
        }

        this.extrDataFromSnackArr(snackInfoArr);
      })
      .catch(err => Alert.alert(JSON.stringify(err)));
  };
  extrDataFromSnackArr = snackInfoArr => {
    const snack = snackInfoArr.find(
      snack => snack.date.toString() === this.state.date.toString()
    );
    const snackName = snack.snackName;
    this.setState({
      snackName: snackName
    });
  };
  storeSnack = snackName => {
    const reqObj = {};
    reqObj.date = this.state.date;
    reqObj.snackName = snackName;
    reqObj.noOfYesVotes = this.state.noOfYesVotes;
    fetch("https://snack-app-5cec3.firebaseio.com/snack.json", {
      method: "POST",
      body: JSON.stringify(reqObj)
    })
      .then(response => response.json())
      .then(res => Alert.alert("success"))
      .catch(err => Alert.alert("error"));
  };

  getVote = () => {
    fetch("https://snack-app-5cec3.firebaseio.com/user-votes.json")
      .then(response => response.json())
      .then(data => {
        let userInfoArr = [];
        for (let key in data) {
          userInfoArr.push({
            date: data[key].date,
            vote: data[key].vote,
            snackName: data[key].snackName,
            user: this.state.currentUser.name
          });
        }
        this.extrDataFromUserArr(userInfoArr);
      })
      .catch(err => Alert.alert(JSON.stringify(err)));
  };
  extrDataFromUserArr = userInfoArr => {
    const snack = userInfoArr.filter(
      snack => snack.date === this.state.date.toString() && snack.vote === "Yes"
    );
    const myVote = userInfoArr.filter(
      item =>
        item.date === this.state.date.toString() &&
        item.user === this.state.currentUser.name
    )[0];
    this.setState({
      vote: myVote.vote,
      snackName: snack[0].snackName,
      noOfYesVotes: snack.length
    });
  };
  storeVote = () => {
    const reqObj = {};
    reqObj.date = this.state.date;
    reqObj.snackName = this.state.snackName;
    reqObj.vote = this.state.vote;
    reqObj.user = this.state.currentUser.name;
    fetch("https://snack-app-5cec3.firebaseio.com/user-votes.json", {
      method: "POST",
      body: JSON.stringify(reqObj)
    })
      .then(response => response.json())
      .then(res => Alert.alert("success"))
      .catch(err => Alert.alert("error"));
  };

  onNotify = snackName => {
    this.storeSnack(snackName);
    // this.persistUser();
    Alert.alert("Notified");
  };
  setIsAdmin = () => {
    this.setState({ isAdmin: !this.state.isAdmin }, () => {
      // this.persistUser();
    });
  };
  castVote = vote => {
    this.setState({
      vote: vote
    }); /* , () => {
      this.storeVotes();
      /*  if (this.state.vote === "Yes") {
        this.setState({
          noOfYesVotes: this.state.noOfYesVotes + 1,
          noOfNoVotes: this.state.noOfNoVotes - 1
        });
      } else {
        this.setState({
          noOfYesVotes: this.state.noOfYesVotes - 1,
          noOfNoVotes: this.state.noOfNoVotes + 1
        });
      } */
    // this.persistUser();
    // } */;
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
          getVote: this.getVote,
          storeVote: this.storeVote,
          getSnack: this.getSnack,
          storeSnack: this.storeSnack,
          getPersistedData: this.getPersistedData,
          checkIfUserSignedIn: this.checkIfUserSignedIn,
          currentUser: this.state.currentUser
        }}
      >
        {this.props.children}
      </SnackContext.Provider>
    );
  }
}
export default SnackProvider;
