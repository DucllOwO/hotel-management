import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { Table, Button, Form, Input } from "antd";
import { updateAccount } from "../../../../api/AccountAPI";
import { AppContext } from "../../../../context/AppContext";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { fetchEmployee, updateEmployee } from "../../../../api/EmployeeAPI";
import CheckButton from "../../../../components/IconButton/CheckButton/CheckButton";
import CancelButton from "../../../../components/IconButton/CancelButton/CancelButton";
import { hasWhiteSpace } from "../../../../Utils/helpers";

const AccountTable = ({ accounts, setAccount }) => {
  const { user } = useContext(AppContext);
  const positionUser = user?.position;

  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Tên đăng nhập",
      dataIndex: "username",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.username)
          .toLocaleLowerCase()
          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
          .replace(/đ/g, "d")
          .includes(value.toLocaleLowerCase());
      },
      render: (text, record) => {
        return String(record.username);
      },
      width: "50%",
      align: "center",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      key: "2",
      title: "Mật khẩu",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.username)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      align: "center",

      render: (text, record) => {
        if (editingRow === record.username)
          return (
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên của tiện ích",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value) {
                      if (!hasWhiteSpace(value)) return Promise.resolve();
                      else
                        return Promise.reject(
                          new Error("Mật khẩu không được có khoảng trắng")
                        );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              style={{ margin: "auto" }}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>
          );
      },
    },
    {
      key: "2",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              {editingRow === record.username ? (
                <>
                  <CheckButton onCheckButton={() => onCheckButton(record)} />
                  <CancelButton onCancelButton={onCancelButton} />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      onChangePassword(record);
                    }}
                  >
                    {" "}
                    Đổi mật khẩu
                  </Button>
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  const onCheckButton = (record) => {
    form
      .validateFields()
      .then((values) => {
        updateAccount(positionUser, record.username, values.password)
          .then((res) => {
            SuccessAlert("Cập nhật mật khẩu thành công.");
            form.resetFields();
            setEditingRow(null);
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Cập nhật mật khẩu thất bại!!");
            form.resetFields();
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="table">
      <div className="buttonContainer">
        <div></div>
        <div>
          <Input.Search
            onSearch={(value) => {
              setSearchedText(value);
            }}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
            placeholder="Tìm kiếm"
            className="searchInput"
            style={{ width: 264 }}
          />
        </div>
      </div>
      <Form form={form}>
        <Table
          showSorterTooltip={false}
          loading={accounts ? false : true}
          columns={columns}
          dataSource={accounts}
          scroll={{ y: "60vh", x: "100%" }}
          rowKey={(row) => row.username}
        ></Table>
      </Form>
    </div>
  );

  function onCancelButton() {
    setEditingRow(null);
  }

  function onChangePassword(record) {
    setEditingRow(record.username);
  }
};

export default AccountTable;
