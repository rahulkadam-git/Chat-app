import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSenderFull } from "../../config/chatLogics";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import UpdateGroup from "./UpdateGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeParticipantAction } from "../../redux/actions/chat.actions";

function ProfileDetail() {
  const { selectedChatfulldetails } = useSelector((state) => state.msg);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const receiverProfile = getSenderFull(user, selectedChatfulldetails.users);

  const removeParticipant = (participant) => {

const currentUserId = user._id

    const removeParticipantInfo = {
      chatId: selectedChatfulldetails._id,
      userId: participant._id,
    };

    dispatch(removeParticipantAction(removeParticipantInfo,currentUserId));
    console.log(selectedChatfulldetails)
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
            Profile
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
              <div className="receiver-profile-section">
                {selectedChatfulldetails.isGroupChat ? (
                  <div className="Group">
                    <div className="groupname" style={{ color: "white" }}>
                      {selectedChatfulldetails.chatName.toUpperCase()}
                      <h6>
                        Group . {selectedChatfulldetails.users.length}{" "}
                        participants
                      </h6>
                    </div>
                    <div className="group-participants">
                      {selectedChatfulldetails.users.map(
                        (participant, index) => (
                          <li
                            style={{ listStyle: "none", color: "white" }}
                            key={index}
                          >
                            <div className="profile-pic">
                              <img
                                src={participant.profile_pic}
                                alt="profilepic"
                              />
                              <h6 className="participant-name">
                                {participant.name}
                              </h6>
                            </div>

                            <div className="remove">
                              <FontAwesomeIcon
                                icon={faXmark}
                                onClick={() => removeParticipant(participant)}
                              />
                            </div>
                          </li>
                        )
                      )}
                    </div>
                    <div className="Update-group">
                      <UpdateGroup />
                    </div>
                  </div>
                ) : (
                  <div className="profile">
                    <div className="ReceiverProfilePic">
                      <img
                        src={receiverProfile.profile_pic}
                        alt="profile-pic"
                      />
                    </div>
                    <div className="fullname">
                      {receiverProfile.name} {receiverProfile.surname}
                    </div>
                    <div className="email">{receiverProfile.email}</div>
                  </div>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default ProfileDetail;
