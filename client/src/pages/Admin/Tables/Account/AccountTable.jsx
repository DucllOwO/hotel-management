import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AccountForm from "../../../../components/Form/AccountForm";
import { updateAccount } from "../../../../api/AccountAPI";
import { AppContext } from "../../../../context/AppContext";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { fetchEmployee, updateEmployee } from "../../../../api/EmployeeAPI";

const AccountTable = ({ accounts, setAccount }) => {
  const { user } = useContext(AppContext);
  const positionUser = user?.position;
  const [modal, setModal] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    fetchEmployee(user?.position)
      .then(({ data }) => {
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy dữ liệu tài khoản để chọn không thành công!!");
      });
  }, [user?.position]);

  const columns = [
    {
      key: "1",
      title: "Tên đăng nhập",
      dataIndex: "username",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.username)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      render: (text, record) => {
        return String(record.username);
      },
      width: "80%",
      align: "center",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      key: "2",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <Button onClick={() => onChangePassword(record)}>
                Đổi mật khẩu
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  function onChangePassword(record) {}

  const openModalEdit = (record) => {
    setModal("edit");
    const { password, ...tempData } = record;
    const employee = employees?.find((employee) => {
      return employee.username === record.username;
    });
    form.setFieldsValue({
      ...tempData,
      employeeUsername: {
        label: employee.username,
        value: employee.id,
      },
      employeeID: employee.id,
    });
  };

  const handleOKModalEdit = () => {
    if (form.isFieldTouched("password") || form.isFieldTouched("email")) {
      form
        .validateFields()
        .then((values) => {
          console.log(values);
          updateAccount(
            positionUser,
            values.username,
            values.password,
            values.email
          ).then((res) => {
            SuccessAlert("Cập nhật thông tin thành công");
            setAccount((prev) => {
              return prev.map((item) => {
                if (item.username === values.username) {
                  return {
                    ...values,
                  };
                }
                return item;
              });
            });
          });
        })
        .catch((err) => console.log(err));
    }

    setModal(null);
    form.resetFields();
  };

  const modalEditAccount = () => (
    <Modal
      title="Thông tin tài khoản"
      open={true}
      onOk={handleOKModalEdit}
      onCancel={handleCancelModal}
      width="40%"
    >
      <AccountForm
        employees={employees}
        form={form}
        required={false}
        editState={true}
      />
    </Modal>
  );

  return (
    <div className="table">
      <>{modal === "edit" && modalEditAccount()}</>
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
      <Table
        loading={accounts ? false : true}
        columns={columns}
        dataSource={accounts}
        scroll={{ y: "60vh", x: "100%" }}
        rowKey={(row) => row.username}
      ></Table>
    </div>
  );

  function handleCancelModal() {
    setModal(null);
    form.resetFields();
  }
};

export default AccountTable;
