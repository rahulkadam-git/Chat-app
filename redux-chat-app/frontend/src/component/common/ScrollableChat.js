import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatLogics";

function ScrollableChat({ message }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <ScrollableFeed>
      {message &&
        message.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {isSameSender(message, m, i, user._id) ||
              isLastMessage(message, m, i, user._id)}

            <span
              style={{
                background: `${
                  m.sender._id === user._id ? "#255C4C" : "#202C33"
                }`,
                color:"white",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(message, m, i, user._id),
                marginTop: isSameUser(message, m, i, user._id) ? 10 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
