import React from "react";
import "./home.css";
import { Button } from "antd";
import Slider from "../../../components/Customer/Slider/Slider";

const Home = () => {
  return (
    <div className="home">
      <div className="top">
        <div>
          <img
            src="https://www.freepnglogos.com/uploads/hotel-logo-png/hotel-icon-download-28.png"
            alt="logo"
            className="homeLogo"
          />
        </div>
        <div>
          <ul className="nav">
            <li className="navItem">TRANG CHỦ</li>
            <div className="bullet"></div>
            <li className="navItem">ĐẶT PHÒNG</li>
            <div className="bullet"></div>
            <li className="navItem">CHI NHÁNH</li>
            <div className="bullet"></div>
            <li className="navItem">ĐÁNH GIÁ</li>
          </ul>
        </div>
        <div className="buttons">
          <Button type="link" className="loginBtn">
            Login
          </Button>
          <Button type="primary" className="signupBtn">
            Sign Up
          </Button>
        </div>
      </div>

      <div className="slider">
        <Slider></Slider>
      </div>

      <div className="sliderPoints">
        <div className="bullet sliderPoint"></div>
        <div className="bullet sliderPoint"></div>
        <div className="bullet sliderPoint"></div>
        <div className="bullet sliderPoint"></div>
      </div>

      <div className="services">
        <div>
          <div className="whatWeServe">
            <div className="serveTitle">
              <div className="what">WHAT</div>
              <div className="weServe">WE SERVE</div>
            </div>
          </div>

          <div className="serveItems">
            <div className="titleContainer">
              <div className="title">TOP VALUES</div>
              <div className="title">FOR YOU</div>
              <div className="titleDesc">
                Try a variety of benifits when using our services.
              </div>
            </div>
          </div>
        </div>
        <div className="choices">
          <img
            src="https://bestanimations.com/media/color-full-earth/152469542globe-earth-animation-15-2.gif"
            alt=""
            className="earth"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
