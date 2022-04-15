import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Container, Offcanvas } from "react-bootstrap";

function Profile(props) {
  let { user } = useSelector((state) => state.auth);

  
  return (
    <div className="profile">
      <Navbar bg="#374248" expand={false}>
        <Container fluid>
          <div className="profile-icon">
            <Navbar.Toggle aria-controls="offanvasNavbar">
              <div className="profile-container">
                <div className="profile-pic">
                  <img src={user.profile_pic} alt="profile-pic" />
                </div>
              </div>
            </Navbar.Toggle>
          </div>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <div className="profile_header">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Profile
                </Offcanvas.Title>
              </Offcanvas.Header>
            </div>
            <Offcanvas.Body>
              <div className="profile-information">
                <div className="inner-profile-pic">
                  <img src={user.profile_pic} alt="profile_pic" />
                </div>
                <div className="information">
                  <h6>Your name</h6>
                  <p>
                    {user.name} {user.surname}
                  </p>
                  <h6>User name</h6>
                  <p>{user.username}</p>
                  <h6>Email</h6>
                  <p>{user.email}</p>
                </div>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Profile;
