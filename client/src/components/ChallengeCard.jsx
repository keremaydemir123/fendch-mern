import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaRegHourglass, FaUserFriends } from "react-icons/fa";

function ChallengeCard({ id, tech, task }) {
  return (
    <div className="flex flex-col justify-between bg-blue-100 w-[500px] h-[300px] rounded-lg py-4 px-4 shadow-lg">
      <div>
        <h1 className="text-3xl text-violet-800 tracking-wide">{tech}</h1>
        <h3 className="italic text-violet-800 font-regular text-xl pb-2 mb-3 border-b-2 border-blue-50">
          "{task}"
        </h3>
      </div>
      <div>
        <div className="flex items-center gap-4 py-2">
          <FaRegHourglass className={"text-violet-900 text-2xl"} />
          <h1 className="text-lg font-light text-blue-900">
            Due to: 202333666
          </h1>
        </div>
        <div className="flex items-center gap-4 py-2">
          <FaUserFriends className={"text-violet-900 text-2xl"} />
          <h1 className="text-lg font-light text-blue-900">
            Submitted Projects: 15
          </h1>
        </div>
      </div>
      <Link to={`/challenges/${id}`}>
        <Button style={{ width: "100%" }}>See Details</Button>
      </Link>
    </div>
  );
}

export default ChallengeCard;
