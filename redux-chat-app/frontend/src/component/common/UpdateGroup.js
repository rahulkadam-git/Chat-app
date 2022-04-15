import React, { useState } from "react";
import {
  renameGroupAction,
  getUserList,
  addNewparticipantAction,
} from "../../redux/actions/chat.actions";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Offcanvas, Form, Button } from "react-bootstrap";
import SearchBox from "../Sidedrawer-container/SearchBox";
import UserDisplayList from "../common/UserDisplayList";
import UserBadgeItem from "./UserBadgeItem";
import { toast } from "react-toastify";

function UpdateGroup() {
  const [NewName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [newUserList, setNewUserList] = useState([]);

  const { selectedChatfulldetails, selectedChatId } = useSelector(
    (state) => state.msg
  );
  const { user } = useSelector((state) => state.auth);
  let { userList } = useSelector((state) => state.chat);

  console.log(selectedChatfulldetails.users);

  const dispatch = useDispatch();

  const handleRename = (e) => {
    e.preventDefault();

    const currentUserId = user._id;
    const newNameDetails = {
      chatId: selectedChatId,
      chatName: NewName,
    };

    dispatch(renameGroupAction(newNameDetails, currentUserId));
  };

  const handleSearch = (search) => {
    setSearch(search);
    if (!search) {
      return;
    }

    dispatch(getUserList(search));
  };

  const addParticipant = (userToAdd) => {
    if (newUserList.includes(userToAdd)) {
      return;
    }

    setNewUserList([...newUserList, userToAdd]);
  };
  const handleDelete = (delUser) => {
    setNewUserList(newUserList.filter((sel) => sel._id !== delUser._id));
  };

  const addUsers = (e, userFromList) => {
    console.log(userFromList);
    e.preventDefault();

    // if (selectedChatfulldetails.users.find((u) => u._id === userFromList._id)) {
    //   toast.error("User already in group", {
    //     position: "top-right",
    //   });
    //   return;
    // }

    const currentUserId = user._id;

    const newParticipantDetails = {
      chatId: selectedChatId,
      newUserList: JSON.stringify(newUserList.map((u) => u._id)),
    };

    const data = dispatch(
      addNewparticipantAction(newParticipantDetails, currentUserId)
    );
    console.log(data, "hhhhhhh");
    if (data) {
      toast.success("New user added in group", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <Navbar bg="#202C33" expand={false}>
        <Container fluid>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            style={{
              border: "none",
              backgroundColor: "#202C33",
              color: "white",
            }}
          >
            UpdateGroup
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="offcanvasNavbarLabel"
                style={{ color: "white" }}
              >
                Group info
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {selectedChatfulldetails.isGroupChat ? (
                <div style={{ color: "white" }}>
                  <Form onSubmit={handleRename}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Enter new Group name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={selectedChatfulldetails.chatName.toUpperCase()}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                      Submit
                    </Button>
                  </Form>

                  <div className="Search-box">
                    <form onSubmit={addUsers}>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Add users</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Add users"
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                      </div>

                      {newUserList.map((u, index) => (
                        <UserBadgeItem
                          key={index}
                          userFromList={u}
                          handleFunction={() => handleDelete(u)}
                        />
                      ))}

                      {userList?.map((userFromList) => (
                        <UserDisplayList
                          key={userFromList._id}
                          userFromList={userFromList}
                          handleFunction={() => addParticipant(userFromList)}
                        />
                      ))}
                      <Button variant="secondary" type="submit">
                        Submit
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default UpdateGroup;
