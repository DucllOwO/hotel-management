import React, { useState } from "react";
import "../../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import "./roomtable.css";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomTable = ({rooms, setRooms, setStatus}) => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Name",
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
      title: "roomType",
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
      title: "Area (m2)",
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
    // {
    //   key: "5",
    //   title: "Actions",
    //   render: (_, record) => {
    //     return (
    //       <>
    //         <Button
    //           onClick={() => {
    //             onBooking(record);
    //           }}
    //         >
    //           book
    //         </Button>
    //       </>
    //     );
    //   },
    // },
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
        <div className="headerButtons">
          <FontAwesomeIcon icon={faSort} className="icon"></FontAwesomeIcon>
          <Button className="headerBtn" onClick={()=>{setStatus(0)}}>Available</Button>
          <Button className="headerBtn" onClick={()=>{setStatus(1)}}>In use</Button>
          <Button className="headerBtn" onClick={()=>{setStatus(2)}}>Waiting</Button>
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
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={rooms}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default RoomTable;
