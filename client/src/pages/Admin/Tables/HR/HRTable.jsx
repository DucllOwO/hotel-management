import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import HRModal from "../../Modals/HR/HRModal";

const HRTable = () => {
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

  const [dataSource, setDataSource] = useState([
    {
      idNum: 1,
      name: "John",
      birthday: "23/03/2002",
      phone: "john phone",
      address: "john address",
      startingDate: "1/1/2022",
      salary: "10000000",
    },
    {
      idNum: 2,
      name: "David",
      birthday: "23/03/2002",
      phone: "david phone",
      address: "david address",
      startingDate: "1/1/2022",
      salary: "10000000",
    },
    {
      idNum: 3,
      name: "James",
      birthday: "J23/03/2002",
      phone: "james phone",
      address: "james address",
      startingDate: "1/1/2022",
      salary: "10000000",
    },
    {
      idNum: 4,
      name: "Sam",
      birthday: "23/03/2002",
      phone: "sam phone",
      address: "sam address",
      startingDate: "1/1/2022",
      salary: "10000000",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "idNum",
      width: 70,
    },
    {
      key: "2",
      title: "Name",
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
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the name",
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
      title: "Birthday",
      dataIndex: "birthday",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Please enter the birthday",
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
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter the phone",
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
      title: "Address",
      dataIndex: "address",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please enter the phone",
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
      title: "Starting Date",
      dataIndex: "startingDate",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="startingDate"
              rules={[
                {
                  required: true,
                  message: "Please enter the phone",
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
      title: "Salary",
      dataIndex: "salary",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="salary"
              rules={[
                {
                  required: true,
                  message: "Please enter the phone",
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
      key: "8",
      title: "Actions",
      render: (_, record) => {
        if (editingRow !== null) {
          if (editingRow === record.idNum) {
            return (
              <>
                <Button
                  htmlType="submit"
                  // onClick={() => {form.submit()}}
                >
                  save
                </Button>
                <Button
                  onClick={() => {
                    setEditingRow(null);
                  }}
                >
                  cancel
                </Button>
              </>
            );
          } else {
          }
        } else {
          return (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setEditingRow(record.idNum);
                  form.setFieldsValue({
                    name: record.name,
                    birthday: record.birthday,
                    phone: record.phone,
                    address: record.address,
                    startingDate: record.startingDate,
                    salary: record.salary,
                  });
                }}
              >
                edit
              </Button>
              <Button
                onClick={() => {
                  onDeleteButton(record);
                }}
              >
                delete
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
      idNum: "" + parseInt(dataSource.length + 1),
      name: "Name " + randomNumber,
      birthday: "23/03/2002",
      phone: randomNumber + " phone",
      address: randomNumber + " address",
      startingDate: "1/1/2022",
      salary: "15000000",
    };

    setDataSource((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...dataSource];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setDataSource(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="HR Infomation"
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
            placeholder="input search text"
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
            Add new
          </Button>
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default HRTable;
