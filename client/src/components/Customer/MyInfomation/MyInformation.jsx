import { Upload, message, Form } from "antd";
import React, { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const MyInforContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  background-color: var(--light-grey);
  border-radius: 30px;
  height: 40px;
  font-size: var(--fs-18);
  padding-left: 25px;

  :focus {
    outline: none;
  }
  @media (min-width: 300px) {
  }
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const SubmitButton = styled.div`
  color: var(--primary-color);
  background-color: var(--black);
  border-radius: 30px;
  padding: 5px 10px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const MyInformation = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div>
      <TopBar />
      <MyInforContainer>
        <h1 style={{ textAlign: "center", margin: "10px 0 30px 0" }}>
          My Information
        </h1>
        <div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <Form layout="vertical">
          <Form.Item label={<Label>Name</Label>}>
            <Input placeholder="Input name" />
          </Form.Item>
          <Form.Item label={<Label>Phone number</Label>}>
            <Input placeholder="Input phone number" />
          </Form.Item>
          <Form.Item label={<Label>Email</Label>}>
            <Input placeholder="Input email" />
          </Form.Item>
          <Form.Item label={<Label>Address</Label>}>
            <Input placeholder="Input address" />
          </Form.Item>
        </Form>
        <SubmitButton style={{ marginBottom: 30 }}>Submit</SubmitButton>
      </MyInforContainer>
      <Footer />
    </div>
  );
};

export default MyInformation;
