import React, { useState } from "react";
import Topbar from "../../Topbar/Topbar";
import { Input } from "antd";
import "./addroom.css";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Select } from "antd";
import UtilitiesButton from "../../Button/UtilitiesButton/UtilitiesButton";
import { ArrowDownOutlined } from "@ant-design/icons";
import BottomBar from "../BottomBar/BottomBar";

const AddRoom = () => {
  const [idNumber, setIDNumber] = useState("");
  const onChangeSelect = (value) => {
    setIDNumber(value);
    console.log(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="addRoom">
      <Topbar
        name="Huỳnh Thế Vĩ"
        img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg"
        position="Manager"
      ></Topbar>

      <div className="addRoomContainer">
        <div className="inputCon">
          <div className="label">Tên phòng </div>
          <Input placeholder="ID" disabled="true"></Input>
        </div>

        <div className="inputCon">
          <div className="label">Hình ảnh: </div>
          <div className="imageList">
            <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
        </div>

        <div className="inputCon">
          <div className="label">Loại phòng: </div>
          <Select
            className="select"
            showSearch
            placeholder="Chọn một loại phòng"
            onChange={onChangeSelect}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "president",
                label: "President",
              },
              {
                value: "luxury",
                label: "Luxury",
              },
            ]}
          />
        </div>

        <div className="inputCon">
          <div className="label">Diện tích: </div>
          <Input suffix="m2" placeholder="Nhập diện tích"></Input>
        </div>

        <div className="inputCon">
          <div className="label">Tiện ích: </div>
          <div className="listUtilities">
            <UtilitiesButton
              icon={ArrowDownOutlined}
              name="Air conditioner"
            ></UtilitiesButton>
          </div>
        </div>

        <div className="inputCon">
          <div className="label">Giá: </div>
          <Input suffix="vnd" placeholder="Nhập giá"></Input>
        </div>
      </div>
      <BottomBar></BottomBar>
    </div>
  );
};

export default AddRoom;
