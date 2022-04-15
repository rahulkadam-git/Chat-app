import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMessagesActions,
  selectedChatId,
  selectedChatFullDetails,
} from "../../redux/actions/msg.action";

function MyChats(props) {
  const { allchat, chatSearch } = props;
  
  let {  socket } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const getChatId = (e, chat) => {   
    e.preventDefault();

    dispatch(selectedChatFullDetails(chat));

    dispatch(selectedChatId(chat._id));

    dispatch(getMessagesActions(chat._id));
    socket.emit("join chat", chat._id);
  };

  const MyChat = (allUserChat) => {
    const filterChats = allUserChat?.filter((filterChat) => {
      return (
        filterChat.chatName.toLowerCase().indexOf(chatSearch.toLowerCase()) !==
        -1
      );
    });
    return (
      <div className="allChatList">
        { filterChats?.map((chat, index) => (
          <div
            className="chat-list-container"
            key={index}
            onClick={(e) => getChatId(e, chat)}
          >
            <h6>
              {chat.chatName}
            </h6>
          </div>
        ))}
      </div>
    );
  };

  return <div className="mychats">{MyChat(allchat)}</div>;
}

export default MyChats;
