import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import logo from "../../assets/images/LogoWhite.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate, Navigate } from "react-router-dom";
import { userRequest } from "../../api/api";
import LocalStorage from "../../Utils/localStorage";
import { AppContext } from "../../context/AppContext";
import { Spin } from "antd";
import ErrorAlert from "../../components/Error/Alert/ErrorAlert";
import { loginAPI } from "../../api/AuthAPI";

const Login = () => {
  useEffect(() => {
    document.title = "Login | Parallel Shine";
  });
  const { setUser } = useContext(AppContext);
  const userLocal = LocalStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <div
      className="login"
      onKeyDownCapture={(e) => e.key === "Enter" && login(e)}
    >
      {userLocal && <Navigate to="/admin" replace={true} />}
      <div>
        <img src={logo} alt="logo" className="logoImg" />
      </div>

      <div className="welcome">Welcome, let's enjoy your life</div>
      <div className="form">
        <div className="inputContainer">
          <div className="labelInput">Tên đăng nhập</div>
          <div className="input">
            <input
              id=""
              type="text"
              placeholder="Vui lòng nhập tên đăng nhập"
              className="input"
              value={username}
              onChange={handleUsername}
            />
          </div>
        </div>

        <div className="inputContainer">
          <div className="labelInput">Mật khẩu</div>
          <div className="passwordLine">
            <div className="input">
              <input
                type={type}
                placeholder="Vui lòng nhập mật khẩu"
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
            <div className="buttonText">Đăng nhập</div>
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
    if (isLoading === false) {
      if (!username || !password) {
        ErrorAlert("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      setIsLoading(true);
      loginAPI(username.trim(), password.trim())
        .then(({ data }) => {
          setIsLoading(false);
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

            userRequest.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data?.accessToken}`;

            navigate("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
          ErrorAlert("Đăng nhập không thành công!!");
        })
        .finally(() => setIsLoading(false));
    }
  }
};

export default Login;
