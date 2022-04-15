import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  clearError,
  clearResponse,
} from "../../redux/actions/auth.actions";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "../../component/common/LoginForm";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const store = useStore();
  const history = useHistory();
  let { user = {}, error, response } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
      toast.success(response, {
        position: "top-center",
      });
    }
  }, [user, history, response]);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearResponse());
  }, [dispatch]);

  useEffect(() => {
    if (error !== "") {
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error]);




  const handleSubmit = (e) => {
    e.preventDefault();

    const userCredential = {
      username,
      password,
    };

    dispatch(loginAction(userCredential));
  };

  

  let loginData = {
    handleSubmit,
    setUsername,
    setPassword,
  };

  return (
    <div id="login" className="App">
      <div className="container">
        <div className="row login-box">
          <LoginForm loginData={loginData} />
        </div>
      </div>
    </div>
  );
}
