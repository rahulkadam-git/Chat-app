import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Profile from "../Sidedrawer-container/Profile";
import { getSender } from "../../config/chatLogics";
import NavbarMenu from "../common/NavbarMenu";
import CreateChat from "../Sidedrawer-container/CreateChat";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getMessagesActions,
  selectedChatId,
  selectedChatFullDetails,
  notificationAction,
} from "../../redux/actions/msg.action";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { socket } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.msg);

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("notification", (newMessageReceived) => {
        if (!notification.includes(newMessageReceived)) {
          if (newMessageReceived.chat.isGroupChat) {
            toast.success(`New Message in ${newMessageReceived.chat.chatName}`, {
              position: "top-right",
            });
          } else {
            toast.success(
              `New Message from ${getSender(
                user,
                newMessageReceived.chat.users
              )}`,
              {
                position: "top-right",
              }
            );
          }
        }

  
      });
    }
  });

  return (
    <div className="navbar-content">
      <nav className="navbar">
        <Profile />
        <div className="links">
          <CreateChat />

          <div className="notification-section">
            <div className="notification" onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faHeart} style={{ color: "#AEBAC1" }} />
            </div>

            {notification.length > 0 ? (
              <div className="notification-indicator"></div>
            ) : (
              <></>
            )}
          </div>
          {open && (
            <div className="notification-display">
              {!notification.length && "No new message"}
              {notification.map((notify) => (
                <div
                  className="notifications-list"
                  onClick={() => {
                    dispatch(selectedChatFullDetails(notify.chat));
                    dispatch(selectedChatId(notify.chat._id));
                    dispatch(getMessagesActions(notify.chat._id));
                  }}
                  key={notify._id}
                >
                  {notify.chat.isGruopChat
                    ? `New Message in ${notify.chat.chatName}`
                    : `New Message from ${getSender(user, notify.chat.users)}`}
                </div>
              ))}
            </div>
          )}

          <NavbarMenu />
        </div>
      </nav>
    </div>
  );
}
