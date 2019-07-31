import React from "react";
import SnackContext from "../../../context/SnackContext";
import { View, Button } from "react-native";

class LandingPage extends React.Component {
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
            <View>
              <Button
                title="View admin page"
                onPress={() => {
                  this.props.navigation.navigate("AddSnackByAdmin");
                }}
              />
            </View>
            <View>
              <Button
                title="View User page"
                onPress={() => {
                  this.props.navigation.navigate("DisplaySnackToUser");
                }}
              />
            </View>
          </>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default LandingPage;
