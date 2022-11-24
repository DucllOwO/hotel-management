import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import "./bookingtable.css";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingTable = () => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [dataSource, setDataSource] = useState([
    {
      idNum: 1,
      roomType: "President",
      area: "50",
      price: "200000",
    },
    {
      idNum: 2,
      roomType: "Luxury",
      area: "50",
      price: "200000",
    },
    {
      idNum: 3,
      roomType: "World-class",
      area: "J50",
      price: "200000",
    },
    {
      idNum: 4,
      roomType: "Standard",
      area: "50",
      price: "200000",
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
      title: "roomType",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.roomType)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.area)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "roomType",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="roomType"
              rules={[
                {
                  required: true,
                  message: "Please enter the roomType",
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
      title: "Area (m2)",
      dataIndex: "area",
      width: 150,
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="area"
              rules={[
                {
                  required: true,
                  message: "Please enter the area",
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
        if (editingRow === record.idNum) {
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
        return (
          <>
            <Button
              onClick={() => {
                onBooking(record);
              }}
            >
              book
            </Button>
          </>
        );
      },
    },
  ];

  const onBooking = (value) => {
    console.log(value.idNum);
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
        <div className="headerButtons">
          <FontAwesomeIcon icon={faSort} className="icon"></FontAwesomeIcon>
          <Button className="headerBtn">Available</Button>
          <Button className="headerBtn">Booked</Button>
          <Button className="headerBtn">Waiting</Button>
        </div>
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
            onClick={() => {}}
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

export default BookingTable;
