import React, { useState } from "react";
import Buttons from "../buttons/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function RegisterForm(props) {
  let {
    handleSubmit,
    setEmail,
    setName,
    setPassword,
    setSurname,
    setUsername,
    setProfilePic,
  } = props.registerData;

  const [picLoading, setPicLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handlePasswordShowClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const handleConfirmPasswordShowClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.error("Please select a picture", {
        position: "top-center",
      });
      return;
    }
    if (pics.type === "type/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "dkh3nvhkt");
      fetch("https://api.cloudinary.com/v1_1/dkh3nvhkt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProfilePic(data.url.toString());

          setPicLoading(false);
        })
        .catch((err) => {
          setPicLoading(false);
        });
    } else {
      toast.error("Please select an Image!", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <div className="col-lg-7 bg-color align-self-center">
        <div className="register-form-section">
          <div className="title">
            <h3>Register here</h3>
          </div>
          <div className="register-inner-form">
            <form method="post" onSubmit={handleSubmit}>
              <div className="name-surname">
                <div className="Name-box">
                  <label id="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="userSurname-box">
                  <label id="label" htmlFor="surname">
                    Surname
                  </label>
                  <input
                    type="text"
                    id="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter your surname"
                  />
                </div>
              </div>
              <div className="emailNusername">
                <div className="email-box">
                  <label id="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="userName-box">
                  <label id="label" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              <div className="complete-password-box">
                <div className="Password-box">
                  <label id="label" htmlFor="Password-box">
                    Password
                  </label>
                  <div className="input-box">
                    <input
                      type={show ? "text" : "password"}
                      id="Password-box"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                    />

                    <FontAwesomeIcon
                      icon={faEye}
                      className="showpass"
                      onClick={handlePasswordShowClick}
                    />
                  </div>
                </div>
                <div className="ConfirmPassword-box">
                  <label id="label" htmlFor="Confirm-Password-box">
                    Confirm Password
                  </label>
                  <div className="input-box">
                    <input
                      type={show ? "text" : "password"}
                      id="Password-box"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                    ></input>

                    <FontAwesomeIcon
                      icon={faEye}
                      className="showpass"
                      onClick={handleConfirmPasswordShowClick}
                    />
                  </div>
                </div>
              </div>
              <div className="uploadpic">
                <div className="uploadpic-box">
                  <label className="form-label" htmlFor="customFile">
                    Please select a photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                    
                  />
                </div>
              </div>

              <div className="buttons">
                <div className="login-link">
                  Do you have already account <Link to="/">SignIn</Link>
                </div>

                <div className="submitbtn">
                  {picLoading ? <Loading /> : <Buttons />}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
