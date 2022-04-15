import React, { useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessageAction,
  getMessagesActions,
  newMessageReceivedAction,
  notificationAction,
} from "../../redux/actions/msg.action";

import { typingAction } from "../../redux/actions/chat.actions";
import { toast } from "react-toastify";
import { getSender } from "../../config/chatLogics";

function TypingBox() {
  const [newMessage, setNewMessage] = useState("");
  const [selectedChatCompare, setSelectedChatCompare] = useState(null);
  const [newReceivedMessage, setNewReceivedMessage] = useState(null);

  let { user } = useSelector((state) => state.auth);

  let {
    selectedChat,
    selectedChatId,
    selectedChatfulldetails,
    notification,
    message,
  } = useSelector((state) => state.msg);

  let { socket, socketConnected, typing } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const sendMesaage = (e) => {
    if (e.key === "Enter" && newMessage) {
      if (selectedChat && user) {
        const msgBody = {
          content: newMessage,
          currentUserId: user._id,
          chatId: selectedChatId,
        };

        dispatch(sendMessageAction(msgBody, socket));

        setNewMessage("");
      }
    }
  };

  useEffect(() => {
    dispatch(getMessagesActions(selectedChatId));
    setSelectedChatCompare(selectedChatfulldetails);
    console.log(selectedChatfulldetails);
  }, [selectedChatfulldetails]);

  useEffect(() => {
    if (socket && selectedChatCompare) {
      socket.on("message recieved", (newMessageReceived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
          console.log(selectedChatCompare);
          if (!notification.includes(newMessageReceived)) {
            dispatch(notificationAction(newMessageReceived));
          }
        } else {
          dispatch(newMessageReceivedAction(newMessageReceived));
          dispatch(getMessagesActions(selectedChatId));
        }
       
      });
    }
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing && socket) {
      dispatch(typingAction(true));

      socket.emit("typing", selectedChatfulldetails._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing && socket) {
        socket.emit("stop typing", selectedChatfulldetails._id);
        dispatch(typingAction(false));
      }
    }, timerLength);
  };

  return (
    <div>
      <div className="inputbox" onKeyDown={sendMesaage}>
        <InputGroup className="mb-3 inputField">
          <FormControl
            placeholder="type a msg"
            aria-label="Type a message"
            aria-describedby="basic-addon2"
            style={{
              backgroundColor: "#2F3B43",
              border: "none",
              color: "white",
            }}
            value={newMessage}
            onChange={typingHandler}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default TypingBox;
