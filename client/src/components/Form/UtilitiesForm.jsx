import { Form, Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
const UtilitiesForm = () => {
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
    <Form>
      <Form.Item label="Tên tiện ích">
        <Input />
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
    </Form>
  );
};

export default UtilitiesForm;
