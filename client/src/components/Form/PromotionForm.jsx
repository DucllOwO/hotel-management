import { DatePicker, Form, Input } from "antd";
import React from "react";
const { RangePicker } = DatePicker;

const dateFormat = "DD-MM-YYYY";
const PromotionForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Tên phiếu giảm giá">
        <Input />
      </Form.Item>
      <Form.Item label="Giảm">
        <Input />
      </Form.Item>
      <Form.Item label="Hiệu lực">
        <RangePicker suffixIcon={null} format={dateFormat} />
      </Form.Item>
    </Form>
  );
};

export default PromotionForm;
