import React from "react";
import { View, StyleSheet, Button, AsyncStorage } from "react-native";
import SnackContext from "../../../context/SnackContext";
import TextContent from "../TextContent";
import RadioBtn from "../RadioBtn";
import Header from "../Header";

const userPageStyle = StyleSheet.create({
  userParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});
class DisplaySnackToUser extends React.Component {
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <>
            <Button
              title="Sign Out"
              onPress={async () => {
                await context.signOut();

                this.props.navigation.navigate("LoginPage");
              }}
            />
            {context.currentUser && (
              <Header>{"Welcome " + context.currentUser.name}</Header>
            )}

            <View style={userPageStyle.userParent}>
              <TextContent>Today's snack</TextContent>
              <TextContent>{context.snackName}</TextContent>
              <TextContent>Would you like to have it?</TextContent>
              <RadioBtn />
            </View>
          </>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default DisplaySnackToUser;
