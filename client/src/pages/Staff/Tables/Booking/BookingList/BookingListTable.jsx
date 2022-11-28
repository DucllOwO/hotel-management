import React, { useState } from "react";
import "../../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import "./bookingListtable.css";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingListTable = ({booking, setBooking}) => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Customer",
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
      dataIndex: "customer_id",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="customer"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer",
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
      title: "From",
      dataIndex: "book_from",
    },
    {
      key: "4",
      title: "To",
      dataIndex: "book_to",
    },
    {
      key: "5",
      title: "Room",
      dataIndex: "size",
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
              check in
            </Button>
            <Button
              onClick={() => {
                onBooking(record);
              }}
            >
              cancel
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
    const updateDataSource = [...booking];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setBooking(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div className="headerButtons">
          <FontAwesomeIcon icon={faSort} className="icon"></FontAwesomeIcon>
          <Button className="headerBtn">Waiting</Button>
          <Button className="headerBtn">Serving</Button>
          <Button className="headerBtn">Finished</Button>
          <Button className="headerBtn">Canceled</Button>
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
          dataSource={booking}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default BookingListTable;
