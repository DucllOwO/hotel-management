import { Form, Input, Upload, Select } from "antd";
import ImgCrop from "antd-img-crop";
import React from "react";
import { useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import UtilitiesButton from "../Button/UtilitiesButton/UtilitiesButton";
const AddRoomForm = () => {
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

  const [idNumber, setIDNumber] = useState("");

  const onChangeSelect = (value) => {
    setIDNumber(value);
    console.log(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div>
      <Form layout="vertical">
        <div className="modal">
          <div className="left">
            <Form.Item label="">
              <Form.Item label="ID" name="id">
                <Input
                  size="large"
                  controls={false}
                  disabled={true}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Hình ảnh">
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
            </Form.Item>
            <Form.Item label="Loại phòng">
              <Select
                size="large"
                className="select"
                showSearch
                placeholder="Chọn một loại phòng"
                onChange={onChangeSelect}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
            </Form.Item>
            <Form.Item label="Diện tích">
              <Input
                suffix="m2"
                placeholder="Nhập diện tích"
                size="large"
              ></Input>
            </Form.Item>
            <Form.Item label="Tiện ích">
              <div className="listUtilities">
                <UtilitiesButton
                  icon={ArrowDownOutlined}
                  name="Air conditioner"
                ></UtilitiesButton>
              </div>
            </Form.Item>
            <Form.Item label="Giá">
              <Input suffix="vnd" placeholder="Nhập giá" size="large"></Input>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddRoomForm;
