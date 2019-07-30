import React from "react";
import SnackContext from "../../../context/SnackContext";
import Header from "../Header";

class LandingPage extends React.Component {
  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <Header>{"Welcome" + context.currentUser.user.name}</Header>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default LandingPage;
