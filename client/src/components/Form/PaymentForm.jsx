import { DatePicker, Form, Input, Select } from "antd";
import React, { useContext, useState } from "react";
import { fetchEmployeeByID } from "../../api/EmployeeAPI";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const PaymentForm = ({}) => {
  const dateFormat = "DD-MM-YYYY";
  return (
    <Form layout="vertical">
      <Form.Item label="ID">
        <Input size="large" disabled={true} value="ID1" />
      </Form.Item>
      <Form.Item label="Ngày lập" name="established_date">
        <DatePicker
          defaultValue={dayjs(Date.now())}
          onChange={(values) => {
            // setTime(values.$d);
          }}
          picker="date"
          format={dateFormat}
        ></DatePicker>
      </Form.Item>
      <Form.Item label="Ghi chú">
        <TextArea rows={4} placeholder="Nhập ghi chú" maxLength={200} />
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
