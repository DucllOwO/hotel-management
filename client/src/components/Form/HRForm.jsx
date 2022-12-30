import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { fetchEmployeeByID } from "../../api/EmployeeAPI";
import { fetchPosition } from "../../api/PositionAPI";
import { AppContext } from "../../context/AppContext";
import { hasWhiteSpace, isAlphaOnly, isNumberKey } from "../../Utils/helpers";
import ErrorAlert from "../Error/Alert/ErrorAlert";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";
import dayjs from "dayjs";

const DATE_FORMAT = "DD-MM-YYYY";

const HRForm = ({
  form,
  disable = false,
  isEmployeeExist,
  setIsEmployeeExist,
}) => {
  const { user } = useContext(AppContext);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const checkIDExist = () => {
    setIsLoading(true);
    fetchEmployeeByID(user.position, form.getFieldValue("id"))
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setIsEmployeeExist(true);
        } else setIsEmployeeExist(false);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Kiểm tra nhân viên thất bại.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    if (!hasWhiteSpace(value)) return Promise.resolve();
                    else
                      return Promise.reject(
                        new Error("CCCD/CMND không được có khoảng trắng")
                      );
                  }
                  return Promise.resolve();
                },
              }),
              {
                pattern: new RegExp(/\d/g),
                message: "CMND/CCCD chỉ được nhập số",
              },
            ]}
            tooltip="Số CMND/CCCD của khách hàng"
          >
            <Search
              onSearch={() => {
                checkIDExist();
              }}
              placeholder="Nhập CCCD của khách hàng"
              size="large"
              maxLength={12}
              enterButton="Kiểm tra"
              loading={isLoading}
              disabled={disable}
            />
          </Form.Item>
          {isEmployeeExist ? (
            <ErrorMessage message="Đã bị trùng CCCD/CMND vui lòng kiểm tra lại." />
          ) : null}
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    if (isAlphaOnly(value[value.length - 1]))
                      return Promise.resolve();
                    else
                      return Promise.reject(
                        new Error("Họ tên không được nhập số")
                      );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input size="large" style={{ textTransform: "capitalize" }} />
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
                len: 10,
                message: "Số điện thoại bao gồm 10 số",
              },
              {
                pattern: new RegExp(/\d/g),
                message: "Số điện thoại chỉ bao gồm số",
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    const birthday = dayjs(value);
                    const now = dayjs(Date.now());
                    if (now.diff(birthday, "year") < 18) {
                      return Promise.reject(
                        new Error("Nhân viên chưa đủ 18 tuổi.")
                      );
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker size="large" format={DATE_FORMAT} />
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
        </div>
      </div>
    </Form>
  );
};

export default HRForm;
