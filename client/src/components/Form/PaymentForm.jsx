import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useContext, useState } from "react";
import { fetchEmployeeByID } from "../../api/EmployeeAPI";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const PaymentForm = ({ form }) => {
  const dateFormat = "DD-MM-YYYY";
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name={"name"}
        label="Lí do"
        rules={[
          {
            required: true,
            message: "Vui lòng lí do tạo thanh toán!",
          },
        ]}
      >
        <TextArea size="large" placeholder="Lí do" />
      </Form.Item>
      <Form.Item
        label="Ngày lập"
        name="established_date"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày lập!",
          },
        ]}
        initialValue={dayjs(Date.now())}
      >
        <DatePicker
          //defaultValue={dayjs(Date.now())}
          picker="date"
          format={dateFormat}
        ></DatePicker>
      </Form.Item>
      <Form.Item
        name="total_cost"
        label="Tổng tiền"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tổng tiền!",
          },
        ]}
      >
        <InputNumber
          controls={false}
          size="large"
          placeholder="Tổng tiền"
          addonAfter={String("đ")}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
