import React from "react";
import { Text } from "react-native";

function ViewVotes(props) {
  return (
    <TextContent>
      Number of people want to have it:{context.noOfYesVotes}
    </TextContent>
  );
}

export default ViewVotes;
