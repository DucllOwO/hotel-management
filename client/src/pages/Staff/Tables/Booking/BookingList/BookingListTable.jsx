import React, { useState } from "react";
import "../../index.css";
import { Table, Button, Modal, Form, Input, Tooltip } from "antd";
import "./bookingListtable.css";
import { PlusOutlined } from "@ant-design/icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextButton from "../../../../../components/TextButton/TextButton";
import CheckButton from "../../../../../components/IconButton/CheckButton/CheckButton";
import CancelButton from "../../../../../components/IconButton/CancelButton/CancelButton";

const BookingListTable = ({ booking, setBooking }) => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "10%",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Khách hàng",
      width: "20%",
      align: "center",
      filteredValue: [searchedText],
      sorter: (a, b) => a.customer_id.localeCompare(b.customer_id),
      onFilter: (value, record) => {
        return (
          String(record.customer_id)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.book_from)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.book_to)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.size)
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
      title: "Từ ngày",
      dataIndex: "book_from",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.book_from.localeCompare(b.book_from),
    },
    {
      key: "4",
      title: "Đến ngày",
      dataIndex: "book_to",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.book_to.localeCompare(b.book_to),
    },
    {
      key: "5",
      title: "Phòng",
      dataIndex: "size",
      align: "center",
      sorter: (a, b) => a.customer_id.localeCompare(b.customer_id),
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
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <CheckButton
                title="Nhận phòng"
                onCheckButton={() => {}}
              ></CheckButton>
              <CancelButton title="Hủy" onCheckButton={() => {}}></CancelButton>
            </div>
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
    <div className="bookingListTable">
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div className="headerButtons">
          <FontAwesomeIcon icon={faSort} className="icon"></FontAwesomeIcon>
          <Button className="headerBtn">Đang đợi</Button>
          <Button className="headerBtn">Đang phục vụ</Button>
          <Button className="headerBtn">Hoàn thành</Button>
          <Button className="headerBtn">Đã huỷ</Button>
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
          {/* <Button
            onClick={() => {}}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button> */}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={booking}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default BookingListTable;
