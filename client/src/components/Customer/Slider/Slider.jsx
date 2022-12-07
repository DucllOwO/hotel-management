import React from "react";
import "./slider.css";
import {
  HomeOutlined,
  StarOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

const Slider = () => {
  return (
    <div className="sliderContainer">
      <div className="black">
        <div className="hotelName">Hotel Name</div>
      </div>
      <div className="centerBar">
        <div className="centerNav">
          <div className="centerBarBtn first">
            <HomeOutlined></HomeOutlined>
            <span className="labelBtn">Stay</span>
          </div>
          <div className="centerBarBtn">
            <StarOutlined></StarOutlined>
            <span className="labelBtn">Reviews</span>
          </div>
          <div className="centerBarBtn last">
            <AppstoreAddOutlined></AppstoreAddOutlined>
            <span className="labelBtn">Features</span>
          </div>
        </div>
        <div className="centerDetail">
          <div className="centerAddress">
            <div className="addressLabel">ADDRESS</div>
            <div className="address">120 Tran Phu, Nha Trang</div>
            <div className="country">VietNam</div>
          </div>

          <div className="imgList">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
              alt=""
              className="image"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
              alt=""
              className="image"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
              alt=""
              className="image"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
              alt=""
              className="image"
            />
          </div>

          <div className="searchBtn">
            <Button
              icon={<SearchOutlined />}
              type="primary"
              size="large"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
