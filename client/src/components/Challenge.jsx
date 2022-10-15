import React from "react";
import { useChallenge } from "../contexts/ChallengeContext";

function Challenge() {
  const { challenge } = useChallenge();

  return <div>{JSON.stringify(challenge)}</div>;
}

export default Challenge;
