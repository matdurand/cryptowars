import React from "react";
import Text from "./Text";
import ChallengeRequest from "./ChallengeRequest";

const ChallengesList = ({ challenges }) => (
  <div>
    {challenges &&
      challenges.length > 0 &&
      challenges.map((challenge, idx) => (
        <ChallengeRequest key={idx} challenge={challenge} />
      ))}
    {challenges.length === 0 && <Text>You have no pending challenges</Text>}
  </div>
);

export default ChallengesList;
