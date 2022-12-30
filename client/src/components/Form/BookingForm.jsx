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

const { Text, Title } = Typography;
const { Search } = Input;

const BookingForm = ({ form, setCurrentCustomer, selectedRooms = [] }) => {
  const { user } = useContext(AppContext);
  const [disable, setDisable] = useState(false);
  const [isCustomerExist, setIsCustomerExist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  async function checkCustomerExist() {
    const searchID = form.getFieldValue("id");

    try {
      setIsSearching(true);
      const { data } = await fetchCustomerByID(user.position, searchID);
      // console.log(dayjs(data.date_of_birth));
      // console.log(form.getFieldValue("id"));
      if (data) {
        setCurrentCustomer(data);
        setIsCustomerExist(true);
        form.setFieldsValue({
          ...data,
          date_of_birth: dayjs(data.date_of_birth),
        });
        setDisable(true);
      } else {
        setCurrentCustomer({});
        setIsCustomerExist(false);
        setDisable(false);
        form.resetFields();
        form.setFieldsValue({ id: searchID });
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
    <Form form={form} layout="vertical" autoComplete="off">
      <Form.Item label="Phòng" name="room_name">
        <div>
          {selectedRooms.map((room) => {
            return (
              <Tag>
                <Title level={5} style={{ margin: "0px auto" }}>
                  {room.room_name}
                </Title>
              </Tag>
            );
          })}
        </div>
      </Form.Item>
      <Form.Item
        label="CCCD"
        name="id"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập CCCD/CMND",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value) {
                if (value.length === 9 || value.length === 12)
                  return Promise.resolve();
                else
                  return Promise.reject(
                    new Error("CCCD/CMND phải là 9 hoặc 12 số")
                  );
              }
              return Promise.resolve();
            },
          }),
          {
            pattern: new RegExp(/\d/g),
            message: "Vui lòng nhập đúng số CCCD",
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
          enterButton="Kiểm tra"
          size="large"
          loading={isSearching}
          maxLength={12}
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
            message: "Vui lòng nhập họ và tên",
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
          {
            max: 10,
            message: "Vui lòng nhập tối đa 10 số",
          },
          {
            pattern: new RegExp(/(0)\d/g),
            message: "Vui lòng nhập đúng số điện thoại",
          },
        ]}
      >
        {/* <InputNumber
            addonAfter={String("đ")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          /> */}
        <Input size="large" disabled={disable} type="tel" maxLength={10} />
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
