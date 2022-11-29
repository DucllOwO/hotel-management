import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";

const ReceiptTable = () => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [dataSource, setDataSource] = useState([
    {
      idNum: "2131241231",
      checkinTime: "12:00 20/11/2022",
      checkoutTime: "11:00 21/11/2022",
      total: "300000",
      staffID: "Staff1",
    },
    {
      idNum: "2131241231",
      checkinTime: "12:00 20/11/2022",
      checkoutTime: "11:00 21/11/2022",
      total: "300000",
      staffID: "Staff2",
    },
    {
      idNum: "2131241231",
      checkinTime: "12:00 20/11/2022",
      checkoutTime: "11:00 21/11/2022",
      total: "300000",
      staffID: "Staff1",
    },
    {
      idNum: "2131241231",
      checkinTime: "12:00 20/11/2022",
      checkoutTime: "11:00 21/11/2022",
      total: "300000",
      staffID: "Staff1",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "idNum",
    },
    {
      key: "2",
      title: "Check-in Time",
      dataIndex: "checkinTime",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="checkinTime"
              rules={[
                {
                  required: true,
                  message: "Please enter the checkinTime",
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
      title: "Check-out Time",
      dataIndex: "checkoutTime",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="checkoutTime"
              rules={[
                {
                  required: true,
                  message: "Please enter the checkoutTime",
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
      title: "Total",
      dataIndex: "total",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                  message: "Please enter the total",
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
      title: "Staff ID",
      dataIndex: "staffID",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="staffID"
              rules={[
                {
                  required: true,
                  message: "Please enter the staff ID",
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
      title: "Actions",
      align: "center",
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
                    checkinTime: record.checkinTime,
                    checkoutTime: record.checkoutTime,
                    total: record.total,
                    staffID: record.staffID,
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
      checkinTime: "12:00 20/11/2022",
      checkoutTime: randomNumber + " checkoutTime",
      total: "200000",
      staffID: "Staff3",
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
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: true, y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default ReceiptTable;
