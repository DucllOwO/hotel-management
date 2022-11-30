import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import HRModal from "../../Modals/HR/HRModal";

const HRTable = ({ employees, setEmployees }) => {
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
      width: 145,
    },
    {
      key: "2",
      title: "Tên",
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
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
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
      title: "SĐT",
      dataIndex: "phone_number",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
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
      title: "Ngày vào làm",
      dataIndex: "start_working_date",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="startingDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày vào làm",
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
      key: "6",
      title: "Lương",
      dataIndex: "salary",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="salary"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lương",
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
      key: "7",
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
                //     phone: record.phone,
                //     address: record.address,
                //     startingDate: record.startingDate,
                //     salary: record.salary,
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
      name: "Name " + randomNumber,
      birthday: "23/03/2002",
      phone: randomNumber + " phone",
      startingDate: "1/1/2022",
      salary: "15000000",
    };

    setEmployees((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setEmployees((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...employees];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setEmployees(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin nhân sự"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <HRModal></HRModal>
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
          dataSource={employees}
          scroll={{ y: 350 }}
          rowKey={(record) => record.id}
        ></Table>
      </Form>
    </div>
  );
};

export default HRTable;
