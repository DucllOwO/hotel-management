import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AccountForm from "../../../../components/Form/AccountForm";
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from "../../../../api/AccountAPI";
import { AppContext } from "../../../../context/AppContext";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { fetchEmployee, updateEmployee } from "../../../../api/EmployeeAPI";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

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
      width: "80%",
      align: "center",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    // {
    //   key: "2",
    //   title: "Email",
    //   dataIndex: "email",
    //   render: (text, record) => {
    //     return record.email ? String(record.email) : "";
    //   },
    // },

    {
      key: "2",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton
                openModalEdit={() => {
                  console.log("aaa");
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
                }}
              ></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const openModalEdit = (record) => {
    console.log("aa");
    setModal("edit");
    const { password, ...tempData } = record;
    const employee = employees?.find((employee) => {
      return employee.username === record.username;
    });
    form.setFieldsValue({
      ...tempData,
      employeeUsername: { label: employee.username, value: employee.id },
      employeeID: employee.id,
    });
  };

  const handleCancelModal = () => {
    setModal(null);
    form.resetFields();
  };

  const handleOKModalAdd = () => {
    form
      .validateFields()
      .then((values) => {
        onCreateAccount(values);
      })
      .catch((error) => console.log(error));
  };

  const onCreateAccount = async (values) => {
    try {
      await createAccount(positionUser, values);
      await updateEmployee(positionUser, { username: values.username });
      console.log(values);
      setAccount((prev) => [...prev, values]);
      SuccessAlert("Tạo tài khoản thành công.");
    } catch (error) {
      console.log(error);
      ErrorAlert("Tạo tài khoản thất bại.");
    }

    setModal(null);
    form.resetFields();
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

  const onDeleteButton = (record) => {
    Modal.confirm({
      title:
        "Bạn có chắc muốn xoá dữ liệu, khi xóa tài khoản dữ liệu nhân viên cũng sẽ bị xóa?",
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
      onOk: () => {
        deleteAccount(positionUser, record.username)
          .then((res) => {
            SuccessAlert("Xóa tài khoản thành công.");
            setAccount((pre) => {
              return pre.filter((data) => data.username !== record.username);
            });
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Xóa tài khoản thất bại!!");
          });
      },
    });
  };

  const modalAddAccount = () => (
    <Modal
      title="Thông tin tài khoản"
      open={true}
      onOk={handleOKModalAdd}
      onCancel={handleCancelModal}
      width="40%"
    >
      <AccountForm employees={employees} form={form} required={true} />
    </Modal>
  );

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
      <>
        {modal === "add" && modalAddAccount()}
        {modal === "edit" && modalEditAccount()}
      </>
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
          <Button
            onClick={() => {
              setModal("add");
            }}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Table
        showSorterTooltip={false}
        loading={accounts ? false : true}
        columns={columns}
        dataSource={accounts}
        scroll={{ y: "60vh", x: "100%" }}
        rowKey={(row) => row.username}
      ></Table>
    </div>
  );
};

export default AccountTable;
