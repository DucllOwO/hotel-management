import React, { useState } from 'react'
import "./login.css"
import logo from "../../assets/images/logo.png"
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [type, setType] = useState('password')

  return (
    <div className='login'>
      <div className="logo">
        <img src={logo} alt="logo" className='logoImg'/>
      </div>

      <div className="welcome">Welcome, let's enjoy your life</div>
      <div className='form'>
  
        <div className="inputContainer">
          <div className="label">Username</div>
          <div className="input">
            <input type="text" placeholder='Please enter username' className='input'/>
          </div>
        </div>
  
        <div className="inputContainer">
          <div className="label">Password</div>
          <div className='passwordLine'>
            <div className="input">
              <input type={type} placeholder='Please enter password' className='input'/>
            </div>
            <div className="type" onClick={typeHandler}>
              {
                type !== 'password' ? <EyeInvisibleOutlined className='icon'></EyeInvisibleOutlined> : <EyeOutlined className='icon'></EyeOutlined>
              }
            </div>
          </div>
        </div>
  
        <div className="loginButton" onClick={Navigate}>
          <div className='buttonText'>Login</div>
        </div>
      </div>
    </div>
  )

  function typeHandler() {
    if(type==='password')
    {
      setType('text')
    }
    else{
      setType('password')
    }
  }

  function Navigate(){
    console.log('pressed')
    // useNavigate('/admin')
  }
}

export default Login