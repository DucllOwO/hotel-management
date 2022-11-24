import React, { useState, useContext } from "react";
import "./login.css";
import logo from "../../assets/images/logo.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate, Navigate } from "react-router-dom";
import { publicRequest } from "../../api/api";
import LocalStorage from "../../Utils/localStorage";
import { AppContext } from "../../context/AppContext";
import { Spin } from "antd";

const Login = () => {
  const { setUser } = useContext(AppContext);
  const userLocal = LocalStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <div className="login">
      {userLocal && <Navigate to="/admin/dashboard" replace={true} />}
      <div className="logo">
        <img src={logo} alt="logo" className="logoImg" />
      </div>

      <div className="welcome">Welcome, let's enjoy your life</div>
      <div className="form">
        <div className="inputContainer">
          <div className="labelInput">Username</div>
          <div className="input">
            <input
              id=""
              type="text"
              placeholder="Please enter username"
              className="input"
              value={username}
              onChange={handleUsername}
            />
          </div>
        </div>

        <div className="inputContainer">
          <div className="label">Password</div>
          <div className="passwordLine">
            <div className="input">
              <input
                type={type}
                placeholder="Please enter password"
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

        {error ? (
          <h2 style={{ color: "red" }}>
            Có lỗi khi đăng nhập vui lòng thử lại
          </h2>
        ) : null}

        {isLoading ? (
          <div className="loginButton">
            <Spin tip="Loading..."></Spin>
          </div>
        ) : (
          <div className="loginButton" onClick={login}>
            <div className="buttonText">Login</div>
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

  async function login(e) {
    e.preventDefault();

    if (!isLoading) {
      try {
        setIsLoading(true);
        const { data } = await publicRequest.post("/auth/login", {
          username,
          password,
        });
        console.log(data);
        if (data) {
          const user = {
            account: data?.user,
            token: data?.accessToken,
            position: data?.position,
            permission: data?.permission,
          };

          // save token for axios
          LocalStorage.setItem("user", user);
          // save user to app context
          setUser(user);
          setIsLoading(false);
          navigate("/admin/dashboard");
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    // useNavigate('/admin')
  }
};

export default Login;
