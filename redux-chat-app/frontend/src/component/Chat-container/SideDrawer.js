import React, { useEffect, useState } from "react";
import MyChats from "../Sidedrawer-container/MyChats";
import Navbar from "../Navbar/Navbar";
import ChatSearchBox from "../Sidedrawer-container/ChatSearchBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatsAction } from "../../redux/actions/chat.actions";
import { getSender } from "../../config/chatLogics";

function Sidedrawer(props) {
  let { allChats } = useSelector((state) => state.chat);
  let { user } = useSelector((state) => state.auth);
  const [chatSearch, setChatSearch] = useState("");

  const [allchat, setAllChat] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const currentUserId = user._id;
      dispatch(fetchChatsAction(currentUserId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (
      allChats !== null &&
      typeof user !== "undefined" &&
      allChats.length > 0
    ) {
      let newData = [];
      allChats?.map((chat) => {
        return newData.push({
          chatName: !chat.isGroupChat
            ? getSender(user, chat?.users)
            : chat.chatName,
          _id: chat._id,
          isGroupChat: chat.isGroupChat,
          users: chat.users,
        });
      });
      setAllChat(newData);
    }
  }, [allChats, user]);

  return (
    <div className="SideDrawer">
      <div className="sidedrawer-inner">
        <Navbar />
        <ChatSearchBox
          allchat={allchat}
          setAllChat={setAllChat}
          chatSearch={chatSearch}
          setChatSearch={setChatSearch}
        />
        <div className="chats-sections">
          <MyChats allchat={allchat} chatSearch={chatSearch} />
        </div>
      </div>
    </div>
  );
}

export default Sidedrawer;
