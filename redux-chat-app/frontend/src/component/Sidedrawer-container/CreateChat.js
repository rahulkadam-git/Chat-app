import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import SearchBox from "./SearchBox";
import NewChat from "./NewChat";

function CreateChat() {
  return (
    <>
      <div className="newchat-field">
        <Navbar bg="#374248" expand={false}>
          <Container fluid>
            <div className="Newchat">
              <Navbar.Toggle aria-controls="offanvasNavbar">
                <FontAwesomeIcon
                  icon={faMessage}
                  style={{ color: "#AEBAC1", cursor: "pointer" }}
                  size="1x"
                />
              </Navbar.Toggle>
            </div>
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
            >
              <div className="headerOff">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                    Newchat
                  </Offcanvas.Title>
                </Offcanvas.Header>
              </div>
              <Offcanvas.Body>
                <div className="searchbox">
                  <SearchBox />
                </div>
                <div className="creategroupchat">
                  <NewChat />
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default CreateChat;
