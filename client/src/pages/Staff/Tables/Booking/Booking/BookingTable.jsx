import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import "./bookingTable.css";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingTable = ({ rooms, setRooms, setStatus, setFrom, setTo }) => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const { RangePicker } = DatePicker;

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Phòng",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "room_name",
    },
    {
      key: "2",
      title: "Loại phòng",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType)
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
      title: "Diện tích",
      dataIndex: "size",
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
      title: "Giá",
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
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                onBooking(record);
              }}
            >
              Đặt
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
    const updateDataSource = [...rooms];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setRooms(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div className="header">
          <div>
            <RangePicker
              format={"DD/MM/YYYY"}
              onChange={(value) => {
                setFrom(value[0]?._d);
                setTo(value[1]?._d);
              }}
            />
          </div>
          <div className="headerButton">
            <Button className="headerBtn" onClick={()=>{setStatus(0)}}>Đang trống</Button>
            <Button className="headerBtn" onClick={()=>{setStatus(1)}}>Đang sử dụng</Button>
            <Button className="headerBtn" onClick={()=>{setStatus(2)}}>Đang đợi</Button>
          </div>
        </div>
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
      <Form form={form} onFinish={onFinish} className="form">
        <Table columns={columns} dataSource={rooms} scroll={{ y: 350 }}></Table>
      </Form>
    </div>
  );
};

export default BookingTable;
