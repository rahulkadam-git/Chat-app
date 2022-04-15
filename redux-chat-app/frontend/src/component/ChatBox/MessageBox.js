import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollableChat from "../common/ScrollableChat";
import { getMessagesActions } from "../../redux/actions/msg.action";

function MessageBox(props) {
  const { selectedChat } = useSelector((state) => state.msg);

  const dispatch = useDispatch();

  return (
    <div className="message-box">
      <ScrollableChat message={selectedChat} />
    </div>
  );
}

export default MessageBox;
