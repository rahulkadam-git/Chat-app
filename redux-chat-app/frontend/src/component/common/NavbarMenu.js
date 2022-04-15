import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Logout from "../buttons/Logout";
import NewChat from "../Sidedrawer-container/NewChat";

function NavbarMenu(props) {
  const [show, setShow] = useState(false);

  return (
    <>
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
        <div className="menu-list">
          <ul>
            <li><NewChat/></li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default NavbarMenu;
