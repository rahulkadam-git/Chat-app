import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Loader from "../common/Loader";
import { getSearchList } from "../../redux/actions/auth.actions";
import { accessChatAction } from "../../redux/actions/chat.actions";
import {
  getMessagesActions,
  selectedChatId,
  selectedChatFullDetails,
} from "../../redux/actions/msg.action";
import { useDispatch, useSelector } from "react-redux";
import UserDisplayList from "../common/UserDisplayList";

function SearchBox(props) {
  const [search, setSearch] = useState("");
  let { searchList, isLoading, user } = useSelector((state) => state.auth);
  let { accessChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getSearchList(search));
  };

  const getChat = (selectedUsesId) => {
    const userIds = {
      currentUserId: user._id,
      userId: selectedUsesId,
    };

    dispatch(accessChatAction(userIds));
    dispatch(selectedChatFullDetails(accessChat));

    dispatch(selectedChatId(accessChat._id));

    dispatch(getMessagesActions(accessChat._id));

  };


  return (
    <div className="searchbox">
      <div className="searchbox-input">
        <InputGroup className="mb-3 inputField">
          <FormControl
            placeholder="Search friend's here"
            aria-label="person's username"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleSearch}
          >
            {isLoading ? <Loader /> : <>Search</>}
          </Button>
        </InputGroup>
      </div>
      <div className="search-list">
        {searchList?.map((userFromList, index) => (
          <UserDisplayList
            key={index}
            userFromList={userFromList}
            handleFunction={() => getChat(userFromList._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchBox;
