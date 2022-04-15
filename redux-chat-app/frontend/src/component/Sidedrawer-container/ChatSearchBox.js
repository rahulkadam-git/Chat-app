import React, { useEffect, useState } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSender } from "../../config/chatLogics";

function ChatSearchBox(props) {
  const { allchat, setAllChat, chatSearch, setChatSearch } = props;

  const [searchUser, setSearchUser] = useState([]);
  let { user } = useSelector((state) => state.auth);

  const handleChatSearch = (text) => {
    setChatSearch(text);

    if (text.length <= 0) {
      setSearchUser(allchat);
    } else {
      const searchData = allchat?.filter((name) => {
        return name.chatName.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });

      setSearchUser(searchUser);
    }
  };

  return (
    <div>
      <div className="searchbox-input">
        <InputGroup className="mb-3 inputField">
          <FormControl
            placeholder="Search friend's here"
            aria-label="person's username"
            aria-describedby="basic-addon2"
            value={chatSearch}
            onChange={(e) => handleChatSearch(e.target.value)}
            style={{ border: "none", backgroundColor: "#2F3B43" }}
          />

          <Button
            variant="outline-secondary"
            id="button-addon2"
            // onClick={handleChatSearch}
            style={{ border: "none" }}
          >
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default ChatSearchBox;
