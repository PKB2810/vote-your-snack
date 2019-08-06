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
      date: "",
      currUserInfoArr: [],
      userList: []
    };
  }
  componentDidMount() {
    GoogleSignin.configure();
    this.fetchUserList();
    this.setDate();
  }

  fetchUserList = async () => {
    await this.getUserList();
  };
  getUserList = async () => {
    return fetch("https://snack-app-5cec3.firebaseio.com/user-list.json")
      .then(response => response.json())
      .then(data => {
        let userListArr = [];
        for (let key in data) {
          userListArr.push({
            empId: key,
            email: data[key].email,
            isAdmin: data[key].isAdmin
          });
        }

        this.setState({
          userList: userListArr
        });
      })
      .catch(err => console.log(JSON.stringify(err)));
  };
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
    let authorizedUser = this.state.userList.find(
      userRecord => userRecord.email === user.email
    );
    if (authorizedUser) {
      return new Promise(resolve => {
        this.setState({ currentUser: user }, function() {
          this.setState({ isAdmin: authorizedUser.isAdmin }, function() {
            resolve({
              currUser: this.state.currentUser,
              isAdmin: this.state.isAdmin
            });
          });
        });
      });
    }
    throw new Error("You are not authorized!");
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
      const currUserpromiseObj = await this.promisedSetState(userInfo.user);

      return currUserpromiseObj;

      // this.persistUser();
      //this.setState({ currentUser: JSON.stringify(userInfo.user) });
      //
    } catch (error) {
      // console.log(error);
      this.signOut();
      Alert.alert(error.message);
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
    return fetch("https://snack-app-5cec3.firebaseio.com/snack.json")
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
      .catch(err => console.log(JSON.stringify(err)));
  };
  extrDataFromSnackArr = snackInfoArr => {
    try {
      const snack = snackInfoArr.find(
        snack => snack.date.toString() === this.state.date.toString()
      );
      if (snack === undefined && this.state.isAdmin) {
        Alert.alert("Hey admin! What is today's snack?");
      }
      if (snack === undefined && !this.state.isAdmin) {
        Alert.alert(
          "Hey user! Snack is yet to be added.Till then grab a snickers!"
        );
      }
      const snackName = snack.snackName;

      this.setState({
        snackName: snackName
      });
    } catch (err) {
      Alert.alert(err.message);
    }
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
    return fetch("https://snack-app-5cec3.firebaseio.com/user-votes.json")
      .then(response => response.json())
      .then(data => {
        let userInfoArr = [];
        for (let key in data) {
          userInfoArr.push({
            key: key,
            date: data[key].date,
            vote: data[key].vote,
            snackName: data[key].snackName,
            user: data[key].user
          });
        }
        this.setState({
          currUserInfoArr: userInfoArr
        });
      })
      .catch(err => Alert.alert(JSON.stringify(err.message)));
  };
  extrDataFromUserArr = userInfoArr => {
    try {
      const snack = userInfoArr.filter(
        snack =>
          snack.date === this.state.date.toString() && snack.vote === "Yes"
      );

      if (this.state.isAdmin) {
        //msg for admin if no user yet has voted in favour of snack
        if (snack.length === 0 && this.state.snackName !== "") {
          Alert.alert("No votes in favour of current snack");
        }

        this.setState({
          noOfYesVotes: snack.length
        });
      }
      const myVote = userInfoArr.filter(
        item =>
          item.date === this.state.date.toString() &&
          item.user === this.state.currentUser.email
      )[0];
      //error msg for user if his vote hasnt been registered yet
      if (myVote.length === 0) {
        Alert.alert("You haven't voted yet.Please do cast your vote");
      } else {
        this.setState({
          vote: myVote.vote
        });
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  storeVote = async () => {
    await this.getVote();
    const currUserRec = this.state.currUserInfoArr.find(
      record =>
        record.user === this.state.currentUser.email &&
        record.date === this.state.date
    );
    const reqObj = {};
    reqObj.date = this.state.date;
    reqObj.snackName = this.state.snackName;
    reqObj.vote = this.state.vote;
    reqObj.user = this.state.currentUser.email;
    if (currUserRec) {
      fetch(
        "https://snack-app-5cec3.firebaseio.com/user-votes/" +
          currUserRec.key +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify(reqObj),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => {
          console.log(response);
          response.json();
        })
        .then(res => {
          console.log(res);
          Alert.alert("Your vote has been updated successfully!");
        })
        .catch(err => Alert.alert(err.message));
    } else {
      fetch("https://snack-app-5cec3.firebaseio.com/user-votes.json", {
        method: "POST",
        body: JSON.stringify(reqObj)
      })
        .then(response => response.json())
        .then(res => Alert.alert("Your vote has been registered successfully!"))
        .catch(err => Alert.alert("error"));
    }
  };

  onNotify = snackName => {
    this.storeSnack(snackName);
    // this.persistUser();
    Alert.alert("Notified");
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
          currentUser: this.state.currentUser,
          currUserInfoArr: this.state.currUserInfoArr,
          extrDataFromUserArr: this.extrDataFromUserArr
        }}
      >
        {this.props.children}
      </SnackContext.Provider>
    );
  }
}
export default SnackProvider;
