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
        ErrorAlert("Lấy dữ liệu chức vụ cho người dùng chọn thất bại!!");
      });
  }, [user?.position]);

  return (
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div className="left" style={{ width: "30vw" }}>
          <Form.Item
            label="CCCD"
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập CCCD!",
              },
            ]}
            tooltip="Số CMND/CCCD của khách hàng"
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
            <Input size="large" style={{ textTransform: "capitalize" }} />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="date_of_birth"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày sinh!",
              },
              {
                type: "date",
                message: "Ngày sinh không hợp lệ!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    const birthday = new Date(value).toJSON().slice(0, 10);
                    let utc = new Date().toJSON().slice(0, 10);
                    console.log(birthday, utc);
                    //console.log(new Date(birthday) == new Date(utc));
                    if (birthday < utc) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Chọn ngày hôm nay hoặc tương lai là ngày sinh không hợp lệ!"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
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
                message: "Số điện thoại bao gồm 10 số",
              },
              {
                max: 10,
                message: "Số điện thoại bao gồm 10 số",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <div className="right" style={{ marginLeft: "10%", width: "30vw" }}>
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
                message: "Ngày vào làm không hợp lệ!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    if (
                      !getFieldValue("date_of_birth") ||
                      getFieldValue("date_of_birth") === ""
                    )
                      return Promise.reject(
                        new Error(
                          "Vui lòng chọn ngày sinh trước khi chọn ngày vào làm!"
                        )
                      );
                    const birthday = new Date(getFieldValue("date_of_birth"));
                    const startWorkingDay = new Date(value);
                    console.log(birthday, startWorkingDay);
                    if (startWorkingDay.getTime() > birthday.getTime()) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Ngày vào làm phải sau ngày sinh!")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker size="large" format={DATE_FORMAT} showToday />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng",
              },
            ]}
          >
            <Input
              size="large"
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default HRForm;
