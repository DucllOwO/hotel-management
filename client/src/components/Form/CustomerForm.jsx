import { DatePicker, Form, Input } from "antd";
import React from "react";

const CustomerForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="CCCD">
        <Input />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày sinh">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Email">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
