import { DatePicker, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import { fetchCustomerByID } from "../../api/CustomerAPI";
import { AppContext } from "../../context/AppContext";
import dayjs from "dayjs";

const { Text, Title } = Typography;
const { Search } = Input;

const BookingForm = ({ form, setCurrentCustomer }) => {
  const { user } = useContext(AppContext);
  const [disable, setDisable] = useState(false);
  const [isCustomerExist, setIsCustomerExist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  async function checkCustomerExist() {
    try {
      setIsSearching(true);
      const { data } = await fetchCustomerByID(
        user.position,
        form.getFieldValue("id")
      );
      // console.log(data);
      // console.log(form.getFieldValue("id"));
      if (data) {
        setCurrentCustomer(data);
        setIsCustomerExist(true);
        form.setFieldsValue({
          ...data,
          date_of_birth: dayjs(data.date_of_birth, "DD-MM-YYYY"),
        });
        setDisable(true);
      } else {
        setIsCustomerExist(false);
        setDisable(false);
      }
      setIsSearching(false);
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      setIsSearching(false);
      return Promise.reject(
        new Error("Đã có lỗi khi kiểm tra khách hàng đã tồn tại!")
      );
    }
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Phòng" name="room_name">
        <Input size="large" disabled={true} />
      </Form.Item>
      <Form.Item
        label="CCCD"
        name="id"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập CCCD/CMND",
          },
        ]}
        tooltip="Nếu khách hàng mới thì nhập thông tin khách, khách hàng cũ thì sẽ tự lấy thông tin"
        style={{ marginBottom: 0 }}
      >
        <Search
          onSearch={() => {
            checkCustomerExist();
          }}
          placeholder="Nhập CCCD của khách hàng"
          enterButton="Search"
          size="large"
          loading={isSearching}
        />
      </Form.Item>
      <div style={{ marginBottom: 24 }}>
        {isCustomerExist == null ? (
          <Text>Nhập CCCD để kiểm tra xem khách hàng đã tồn tại chưa</Text>
        ) : null}
        {isCustomerExist === true ? (
          <Text>Khách hàng đã tồn tại, dữ liệu sẽ được tự động nhập</Text>
        ) : null}
        {isCustomerExist === false ? (
          <Text>
            Khách hàng chưa tồn tại, vui lòng nhập thông tin khách hàng
          </Text>
        ) : null}
      </div>

      <Form.Item
        label="Họ và tên"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập CCCD/CMND",
          },
        ]}
      >
        <Input size="large" disabled={disable} />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone_number"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại",
          },
        ]}
      >
        <Input size="large" disabled={disable} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input size="large" disabled={disable} />
      </Form.Item>
      <Form.Item
        label="Chọn ngày sinh"
        name="date_of_birth"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày sinh",
          },
        ]}
      >
        <DatePicker size="large" disabled={disable} format="DD-MM-YYYY" />
      </Form.Item>
    </Form>
  );
};

export default BookingForm;
