import React, { useState, useContext, useEffect } from "react";
import "./verify.css";
import logo from "../../assets/images/LogoWhite.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate, Navigate } from "react-router-dom";
import { userRequest } from "../../api/api";
import LocalStorage from "../../Utils/localStorage";
import { AppContext } from "../../context/AppContext";
import { Spin } from "antd";
import ErrorAlert from "../../components/Error/Alert/ErrorAlert";
import { loginAPI } from "../../api/AuthAPI";
import { Button } from "antd/es/radio";

const Verify = ({email= "asda@gmail.com"}) => {
  useEffect(() => {
    document.title = "Sign Up | Parallel Shine";
    setEmail(`We’ve sent an email to ${email}
    to verify your email address and activate your account.
    The link in email will expire in 24 hours`);
  });
  const { setUser } = useContext(AppContext);
  const userLocal = LocalStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [verifyEmail, setEmail] = useState("");
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
      <div>
        <img src={logo} alt="logo" className="logoImg" />
      </div>

      <div className="welcome">Create new account.</div>

      <div className="form">
        <div className="confirmContainer">
          <div className="confirm">Already A Member ?</div>
          <Button type="link">Login</Button>
        </div>
        <div className="verifyEmailContainer">
          <div className="verifyEmailHeader">
            Verify your email
          </div>
          <div className="verifyEmailText">
          We’ve sent an email to <b>{email?email:""}</b> to verify your email address and activate your account.
    The link in email will expire in 24 hours
          </div>
        </div>
        <div className="buttonContainer">
          <div className="loginButton">
            <div className="buttonText">Change email</div>
          </div>
          <div className="loginButton">
            <div className="buttonText">Resend email</div>
          </div>
        </div>

        {/* {error ? (
          <h2 style={{ color: "red" }}>
            Có lỗi khi đăng nhập vui lòng thử lại
          </h2>
        ) : null} */}

        {/* {isLoading ? (
          <div className="loginButton">
            <Spin tip="Loading..."></Spin>
          </div>
        ) : (
          <div className="loginButton">
            <div className="buttonText">Đăng ký</div>
          </div>
        )} */}
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

export default Verify;
