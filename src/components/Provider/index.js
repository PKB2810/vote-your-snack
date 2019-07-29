import React from "react";
import SnackContext from "../../context/SnackContext";

class SnackProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackName: "",
      noOfVotes: 0,
      vote: "",
      voteOption: ["Yes", "No"]
    };
  }

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
          castVote: this.castVote
        }}
      >
        {this.props.children}
      </SnackContext.Provider>
    );
  }
}
export default SnackProvider;
