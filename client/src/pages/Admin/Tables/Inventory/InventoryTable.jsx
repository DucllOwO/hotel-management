import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";

const InventoryTable = () => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Teeth Brush",
      amount: "10",
      price: "20000",
    },
    {
      id: 2,
      name: "Glass",
      amount: "1",
      price: "20000",
    },
    {
      id: 3,
      name: "Bed",
      amount: "1",
      price: "20000",
    },
    {
      id: 4,
      name: "Something",
      amount: "1",
      price: "20000",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
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
          String(record.amount)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.price)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.id) {
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
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please enter the amount",
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
      title: "Price",
      dataIndex: "price",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please enter the price",
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
      title: "Actions",
      render: (_, record) => {
        if (editingRow !== null) {
          if (editingRow === record.id) {
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
              {/* <Button
                onClick={(e) => {
                  e.preventDefault();
                  setEditingRow(record.id);
                  form.setFieldsValue({
                    name: record.name,
                    amount: record.amount,
                    price: record.price,
                  });
                }}
              >
                edit
              </Button> */}
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

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((data) => data.id !== record.id);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...dataSource];
    updateDataSource.splice(editingRow - 1, 1, { ...values, id: editingRow });
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
          scroll={{ y: 410 }}
        ></Table>
      </Form>
    </div>
  );
};

export default InventoryTable;
