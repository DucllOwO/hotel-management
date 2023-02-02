import { Form, Input, Upload, InputNumber } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";

const ItemForm = ({form, item, isEditing}) => {
  const [fileList, setFileList] = useState([]);
  const [disabled, setDisabled] = useState(true);
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
    <Form form={form} layout="vertical">
      <Form.Item 
        label="Tên sản phẩm"
        name="name"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên sản phẩm",
          },
        ]}>
        <Input required disabled={isEditing} />
      </Form.Item>
      <Form.Item 
        label="Số lượng tồn"
        name="reserve_amount"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số lượng",
          },
        ]}
        onChange={(value) => {
          if(!value)
            setDisabled(false);
          else
            setDisabled(true);
        }}>
        <InputNumber min={0}/>
      </Form.Item>
      <Form.Item 
        label="Giá" 
        name="sell_price"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng nhập giá"
          }
        ]}>
        <InputNumber addonAfter={"đ"} min={0} />
      </Form.Item>
    </Form>
  );
};

export default ItemForm;
