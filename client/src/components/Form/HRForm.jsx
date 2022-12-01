import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { fetchPosition } from "../../api/PositionAPI";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const DATE_FORMAT = "DD-MM-YYYY";

const HRForm = ({ form, disable = false }) => {
  const { user } = useContext(AppContext);
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    fetchPosition(user?.position)
      .then(({ data }) => {
        console.log(data);
        setPositions(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Fetch position data for select component error!!");
      });
  }, [user?.position]);

  return (
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div className="left">
          <Form.Item
            label="CCCD"
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập CCCD!",
              },
              {
                max: 12,
                message: "CCCD không được dài quá 12 kí tự",
              },
            ]}
            tooltip="Identity card"
          >
            <Input size="large" disabled={disable} />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="date_of_birth"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày sinh!",
              },
              {
                type: "date",
              },
            ]}
          >
            <DatePicker size="large" format={DATE_FORMAT} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                min: 10,
              },
              {
                max: 10,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <div className="right">
          <Form.Item
            label="Chức vụ"
            name="position_id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chức vụ!",
              },
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Chọn một chức vụ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={positions.map((position) => {
                return {
                  label: position?.name,
                  value: position?.id,
                };
              })}
            />
          </Form.Item>
          {/* <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item> */}
          <Form.Item
            label="Ngày vào làm"
            name="start_working_date"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày vào làm!",
              },
              {
                type: "date",
              },
            ]}
          >
            <DatePicker size="large" format={DATE_FORMAT} showToday />
          </Form.Item>
          <Form.Item
            label="Lương"
            name="salary"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lương!",
              },
              {
                type: "number",
              },
            ]}
          >
            <InputNumber
              size="large"
              controls={false}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default HRForm;
