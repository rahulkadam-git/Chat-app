import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons"

export default function Logout() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <div className="logout" >
      <Link to="/" onClick={onLogout} style={{color:"white" , textDecoration:"none"}}>
        Logout
      </Link>
    </div>
  );
}


