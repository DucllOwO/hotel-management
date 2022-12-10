import { Form, Input, Select } from "antd";
import React, { useContext, useState } from "react";
import { fetchEmployeeByID } from "../../api/EmployeeAPI";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const AccountForm = ({
  form,
  editState = false,
  required = false,
  employees = null,
}) => {
  const { user } = useContext(AppContext);
  const [validatingEmployee, setValidatingEmployee] = useState({
    hasFeedback: false,
    validateStatus: "",
  });

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        hasFeedback={validatingEmployee.hasFeedback ? true : false}
        validateStatus={validatingEmployee.validateStatus}
        label="Nhân viên"
        name="employeeUsername"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn nhân viên!",
          },
          {
            validator: checkAccountAlreadyExist,
          },
        ]}
        tooltip="Chọn nhân viên muốn tạo tài khoản."
      >
        <Select
          size="large"
          showSearch
          placeholder="Chọn một nhân viên"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          options={
            employees
              ? employees?.map((employee) => {
                  return {
                    label: employee?.fullname,
                    value: employee?.id,
                  };
                })
              : []
          }
          onChange={(e) => {
            form.setFieldValue("employeeID", e);
          }}
          disabled={editState}
        />
      </Form.Item>
      <Form.Item label="CCCD" name="employeeID">
        <Input size="large" disabled={true} />
      </Form.Item>
      <Form.Item
        label="Tài khoản"
        name="username"
        rules={
          required
            ? [
                ...usernameRule,
                {
                  validator: checkUsernameAlreadyExist,
                },
                {
                  validator: whitespaceValidator,
                },
              ]
            : [
                {
                  validator: checkUsernameAlreadyExist,
                },
                {
                  validator: whitespaceValidator,
                },
              ]
        }
      >
        <Input size="large" disabled={editState} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "Định dạng email không hợp lệ",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={
          required
            ? [
                ...passwordRule,
                {
                  validator: whitespaceValidator,
                },
              ]
            : [
                {
                  validator: whitespaceValidator,
                },
              ]
        }
        tooltip={editState ? "Chỉ nhập mật khẩu khi cần thay đổi." : null}
      >
        <Input.Password size="large" />
      </Form.Item>
    </Form>
  );

  async function checkAccountAlreadyExist(rule, value, callback) {
    try {
      if (value) {
        setValidatingEmployee({
          hasFeedback: true,
          validateStatus: "validating",
        });
        const res = await fetchEmployeeByID(user?.position, value);

        setValidatingEmployee({ hasFeedback: false, validateStatus: "" });
        if (res.data.username) {
          return Promise.reject(new Error("Nhân viên đã có tài khoản!"));
        }

        return Promise.resolve();
      }
    } catch (error) {
      console.log(error);
      ErrorAlert("Kiểm tra tài khoản đã tồn tại chưa thất bại!!");
      return Promise.reject(new Error("Đã có lỗi khi kiểm tra!"));
    }
  }

  function checkUsernameAlreadyExist(rule, value, callback) {
    try {
      if (value) {
        const indexEmployees = employees.findIndex(
          (employee) => employee.username === value
        );

        if (indexEmployees >= 0)
          return Promise.reject(new Error("Tên đăng nhập đã tồn tại!"));

        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(
        new Error("Có lỗi khi kiểm tra tài khoản đã tồn tại!")
      );
    }
  }
};

const usernameRule = [
  {
    required: true,
    message: "Vui lòng nhập tài khoản",
  },
];

const passwordRule = [
  {
    required: true,
    message: "Vui lòng nhập mật khẩu",
  },
];

function whitespaceValidator(_, value) {
  if (value)
    return !value.includes(" ")
      ? Promise.resolve()
      : Promise.reject(new Error("Không được chứa khoảng trắng"));
}

export default AccountForm;
