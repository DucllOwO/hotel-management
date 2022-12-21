import { Form, Input } from "antd";
import React from "react";

const RoomTypeForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Tên loại phòng">
        <Input />
      </Form.Item>
      <Form.Item label="Số lượng khách">
        <Input />
      </Form.Item>
      <Form.Item label="Số giường">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default RoomTypeForm;
