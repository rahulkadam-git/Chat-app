import React from "react";
import ChatbocHeader from "../ChatBox/ChatbocHeader";
import MessageBox from "../ChatBox/MessageBox";
import TypingBox from "../ChatBox/TypingBox";
import { useSelector } from "react-redux";
import ChatBoxLandingPage from "../ChatBox/ChatBoxLandingPage"

function ChatBox(props) {
  let { selectedChatfulldetails } = useSelector((state) => state.msg);

  return (
    <div className="chatbox">
      <div className="chatbox-inner">
        {selectedChatfulldetails ? (
          <div>
            <ChatbocHeader />
            <MessageBox />
            <TypingBox />
          </div>
        ) : (
          <div><ChatBoxLandingPage/></div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
