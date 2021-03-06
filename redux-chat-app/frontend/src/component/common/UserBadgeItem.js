import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function UserBadgeItem({ userFromList, handleFunction }) {
  return (
    <div className="userbadge">
      <span
        className=" badge badge-primary  text-black"
        onClick={handleFunction}
      >
        {userFromList.name} <FontAwesomeIcon icon={faXmark} />
      </span>
    </div>
  );
}

export default UserBadgeItem;
