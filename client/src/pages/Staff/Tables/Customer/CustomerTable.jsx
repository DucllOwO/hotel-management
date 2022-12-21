import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import "./customertable.css";
import CustomerModal from "../../Modals/Customer/CustomerModal";

const CustomerTable = ({ customer, setCustomer }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handle = () => {
    setIsModalVisible(false);
  };

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "CCCD",
      dataIndex: "id",
      width: 140,
    },
    {
      key: "2",
      title: "Họ và tên",
      width: "25%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.birthday)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "fullname",
      render: (text, record) => {
        return String(record.fullname);
      },
    },
    {
      key: "3",
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày sinh",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
      width: "25%",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        if (editingRow !== null) {
          if (editingRow === record.idNum) {
            return (
              <>
                <Button
                  htmlType="submit"
                  // onClick={() => {form.submit()}}
                >
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    setEditingRow(null);
                  }}
                >
                  Huỷ
                </Button>
              </>
            );
          } else {
          }
        } else {
          return (
            <>
              <Button
              // onClick={(e) => {
              //   e.preventDefault();
              //   setEditingRow(record.idNum);
              //   form.setFieldsValue({
              //     name: record.name,
              //     birthday: record.birthday,
              //     address: record.address,
              //     email: record.email,
              //   });
              // }}
              >
                Chỉnh sửa
              </Button>
              <Button
                onClick={() => {
                  onDeleteButton(record);
                }}
              >
                Xoá
              </Button>
            </>
          );
        }
      },
    },
  ];

  const onAddButton = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newData = {
      idNum: "" + parseInt(customer.length + 1),
      name: "Name " + randomNumber,
      birthday: "23/03/2002",
      address: randomNumber + " address",
    };

    setCustomer((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setCustomer((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...customer];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setCustomer(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin khách hàng"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <CustomerModal></CustomerModal>
        </Modal>
      </>
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
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
            onClick={showModal}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={customer}
          scroll={{ x: true, y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default CustomerTable;
