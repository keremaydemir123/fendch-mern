import React from "react";
import { useAsync } from "../hooks/useAsync";
import { getChallenges } from "../services/challenges";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ChallengeCard from "./ChallengeCard";

function ChallengeList() {
  const { error, loading, value: challenges } = useAsync(getChallenges);

  if (error) return <div>{error}</div>;
  if (loading) return <Loading />;

  return (
    <div className="flex flex-wrap gap-8 w-full p-8 my-16 items-center justify-center">
      {challenges.challenges.map((challenge) => {
        return (
          <ChallengeCard
            tech={challenge.tech}
            task={challenge.task}
            id={challenge._id}
            key={challenge._id}
          />
        );
      })}
    </div>
  );
}

export default ChallengeList;
