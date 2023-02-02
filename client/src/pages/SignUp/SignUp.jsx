import React, { useState, useContext, useEffect } from "react";
import "./signup.css";
import logo from "../../assets/images/LogoWhite.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../api/api";
import LocalStorage from "../../Utils/localStorage";
import { AppContext } from "../../context/AppContext";
import { Spin } from "antd";
import ErrorAlert from "../../components/Error/Alert/ErrorAlert";
import { loginAPI } from "../../api/AuthAPI";
import { Button } from "antd/es/radio";

const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up | Parallel Shine";
  });
  const { setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <div className="login">
      <div onClick={() => navigate("/home")}>
        <img src={logo} alt="logo" className="logoImg" />
      </div>

      <div className="welcome">Create new account.</div>

      <div className="form">
        <div className="confirmContainer">
          <div className="confirm">Already A Member ?</div>
          <Button type="link" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
        <div className="inputContainer">
          <div className="labelInput">Full name</div>
          <div className="input">
            <input
              id=""
              type="text"
              placeholder="Input full name"
              className="input"
              // value={username}
              // onChange={handleUsername}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="labelInput">Email</div>
          <div className="input">
            <input
              id=""
              type="text"
              placeholder="Input email"
              className="input"
              // value={username}
              // onChange={handleUsername}
            />
          </div>
        </div>

        <div className="inputContainer">
          <div className="labelInput">Password</div>
          <div className="passwordLine">
            <div className="input">
              <input
                type={type}
                placeholder="Input password"
                className="input"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="type" onClick={typeHandler}>
              {type !== "password" ? (
                <EyeInvisibleOutlined className="icon"></EyeInvisibleOutlined>
              ) : (
                <EyeOutlined className="icon"></EyeOutlined>
              )}
            </div>
          </div>
        </div>

        {/* {error ? (
          <h2 style={{ color: "red" }}>
            Có lỗi khi đăng nhập vui lòng thử lại
          </h2>
        ) : null} */}

        {isLoading ? (
          <div className="loginButton">
            <Spin tip="Loading..."></Spin>
          </div>
        ) : (
          <div className="loginButton" onClick={(e) => signUp(e)}>
            <div className="buttonText">Đăng ký</div>
          </div>
        )}
      </div>
    </div>
  );

  function typeHandler() {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  function signUp(e) {
    e.preventDefault();

    navigate("/login");
  }
};

export default SignUp;
