import {
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import { fetchCustomerByID } from "../../api/CustomerAPI";
import { AppContext } from "../../context/AppContext";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const { Text, Title } = Typography;
const { Search } = Input;

const BookingListForm = ({ form, setCurrentCustomer, selectedRooms = [] }) => {
  const { user } = useContext(AppContext);
  // const [disable, setDisable] = useState(false);
  // const [isCustomerExist, setIsCustomerExist] = useState(null);
  // const [isSearching, setIsSearching] = useState(false);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Phương thức thanh toán"
        name="method"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng chọn phương thức thanh toán",
          },
        ]}
      >
        <Select
          size="large"
          options={[
            {
              value: "Online",
              label: "Online",
            },
            {
              value: "Offline",
              label: "Offline",
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Phụ thu" name="surcharge">
        <InputNumber
          controls={false}
          size="large"
          addonAfter={String("đ")}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      </Form.Item>

      <Form.Item label="Ghi chú" name="note">
        <TextArea size="large" />
      </Form.Item>
    </Form>
  );
};

export default BookingListForm;
