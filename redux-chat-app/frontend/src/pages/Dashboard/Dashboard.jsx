import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import SideDrawer from "../../component/Chat-container/SideDrawer";
import ChatBox from "../../component/Chat-container/ChatBox";
import io from "socket.io-client";
import {
  newSocketAction,
  setSocketConnected,
  isTypingAction,
} from "../../redux/actions/chat.actions";

const ENDPOINT = "http://localhost:4000";
var socket;

export default function Dashboard() {
  const { user = {} } = useSelector((state) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
    dispatch(newSocketAction(socket));
    socket.emit("setup", user);
    socket.on("connected", () => {
      dispatch(setSocketConnected(true));
    });
    socket.on("typing", () => dispatch(isTypingAction(true)));
    socket.on("stop typing", () => dispatch(isTypingAction(false)));
  }, []);

  return (
    <div className="main-dashboard">
      <div className="chatpage-container">
        {user && <SideDrawer />}
        {user && <ChatBox />}
      </div>
    </div>
  );
}
