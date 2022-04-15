import React from "react";
import ProfileMenu from "../common/ProfileMenu";
import { useSelector } from "react-redux";
import { getSender } from "../../config/chatLogics";

function ChatbocHeader(props) {
  const { selectedChatfulldetails } = useSelector((state) => state.msg);
  const { user } = useSelector((state) => state.auth);
  let { isTyping } = useSelector((state) => state.chat);

  return (
    <div>
      <div className="chatboc-header">
        {selectedChatfulldetails ? (
          <div className="name">
            <div className="nameAndTypinStatus">
              {!selectedChatfulldetails.isGroupChat ? (
                <>{getSender(user, selectedChatfulldetails.users)}</>
              ) : (
                <>
                  <>{selectedChatfulldetails.chatName.toUpperCase()}</>
                </>
              )}
              <div className="typing">
                {isTyping ? <>typing.....</> : <></>}
              </div>
            </div>
            <ProfileMenu />
          </div>
        ) : (
          <div className="defaultHeader" style={{ color: "white" }}>
            Click on user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatbocHeader;
