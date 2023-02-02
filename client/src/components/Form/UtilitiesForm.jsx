import { Form, Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
const UtilitiesForm = ({ form }) => {
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name="name"
        label="Tên tiện ích"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên của tiện ích",
          },
        ]}
        style={{ width: "50%" }}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UtilitiesForm;
