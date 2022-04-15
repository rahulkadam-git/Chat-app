import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import UpdateGroup from "./UpdateGroup";
import ProfileDetail from "./ProfileDetail";
import {useSelector} from "react-redux"

function ProfileMenu(props) {
  const [show, setShow] = useState(false);
  const { selectedChatfulldetails } = useSelector((state) => state.msg);

  return (
    <div>
      <div
        className="Navbar-menu"
        onClick={() => {
          setShow(!show);
        }}
      >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          style={{ color: "#AEBAC1" }}
        />
      </div>
      {show ? (
        <div className="Chat-menu">
          <ul>
            <li>
              <ProfileDetail/>
            </li>
           
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfileMenu;
