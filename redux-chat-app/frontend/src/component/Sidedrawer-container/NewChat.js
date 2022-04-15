import React, { useState } from "react";
import { Button, Navbar, Offcanvas, Container } from "react-bootstrap";
import {
  getUserList,
  createGroupChatAction,
  fetchChatsAction,
} from "../../redux/actions/chat.actions";
import { useDispatch, useSelector } from "react-redux";
import UserBadgeItem from "../common/UserBadgeItem";
import UserDisplayList from "../common/UserDisplayList";

function NewChat(props) {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");

  let { userList } = useSelector((state) => state.chat);
  let { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSearch = (search) => {
    setSearch(search);
    if (!search) {
      return;
    }

    dispatch(getUserList(search));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const CreateGroupInformation = {
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map((u) => u._id)),
      currentUserId: user._id,
    };
    

    dispatch(createGroupChatAction(CreateGroupInformation));
    dispatch(fetchChatsAction(user._id));
  };

  return (
    <div className="create-grp">
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            style={{ border: "none" }}
          >
            <h6>New Group</h6>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header
              closeButton
              style={{ backgroundColor: "#202C33" }}
            >
              <Offcanvas.Title
                id="offcanvasNavbarLabel"
                style={{ color: "white", backgroundColor: "#202C33" }}
              >
                Create a Group
              </Offcanvas.Title>

              <Button variant="secondary" onClick={handleSubmit}>
                Create
              </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <form>
                <div className="form-group">
                  <h5 className="heading">Add group participant</h5>

                  <label htmlFor="exampleInputEmail1">Group name</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter groupname"
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                </div>
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
                <div className="addeduserList">
                  <div className="badge-names">
                    {selectedUsers.map((u, index) => (
                      <UserBadgeItem
                        key={index}
                        userFromList={u}
                        handleFunction={() => handleDelete(u)}
                      />
                    ))}
                  </div>

                  {userList?.map((userFromList) => (
                    <UserDisplayList
                      key={userFromList._id}
                      userFromList={userFromList}
                      handleFunction={() => handleGroup(userFromList)}
                    />
                  ))}
                </div>
              </form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NewChat;
