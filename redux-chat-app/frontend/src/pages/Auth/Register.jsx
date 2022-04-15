import React, { useState, useEffect } from "react";
import {
  registerAction,
  clearResponse,
  clearError,
} from "../../redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterForm from "../../component/common/RegisterForm";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [ProfilePic,setProfilePic] = useState("")


//  email, password, username, name, surname, profile_pic 

  const dispatch = useDispatch();
  const history = useHistory();
  const { error, response } = useSelector((state) => state.auth);

  useEffect(() => {
    if (response !== "") {
      console.log(response);
      history.push("/");
      toast.success(response, {
        position: "top-center",
      });
    }
  }, [response, history]);
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearResponse());
  }, [dispatch]);
  useEffect(() => {
    if (error !== "") {
      console.log("first");
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error]);

  //on form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      surname,
      email,
      password,
      username,
      ProfilePic
    };

   const data =  dispatch(registerAction(newUser));
   console.log(data,"kkkkkkkkk")
  };

  let registerData = {
    handleSubmit,
    setEmail,
    setName,
    setPassword,
    setSurname,
    setUsername,
    setProfilePic,
    setConfirmPassword
  };

  return (
    <div>
      <div id="login" className="App">
        <div className="container">
          <div className="row login-box">
            <RegisterForm registerData={registerData} />
          </div>
        </div>
      </div>
    </div>
  );
}
