import { Form, Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";

const ItemForm = () => {
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
    <Form layout="vertical">
      <Form.Item label="Tên sản phẩm">
        <Input />
      </Form.Item>
      <Form.Item label="Số lượng tồn">
        <Input />
      </Form.Item>
      <Form.Item label="Giá">
        <Input disabled={true} />
      </Form.Item>
    </Form>
  );
};

export default ItemForm;
