import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const dateFormat = "DD-MM-YYYY";

const PromotionTable = ({ vouchers, setVouchers }) => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id",
      render: (text, record) => {
        return record.id;
      },
      width: "10%",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.name;
      },
      width: "25%",
    },
    {
      key: "3",
      title: "Offer",
      dataIndex: "offer",
      render: (text, record) => {
        return record.offer;
      },
      width: "10%",
    },
    {
      key: "4",
      title: "Duration",
      dataIndex: "duration",
      render: (text, record) => {
        return (
          <RangePicker
            suffixIcon={null}
            disabled={true}
            defaultValue={[dayjs(record.valid_from), dayjs(record.valid_from)]}
            format={dateFormat}
          />
        );
      },
      width: "35%",
    },
    {
      key: "5",
      title: "Actions",
      render: (_, record) => {
        return <Button>Suspend</Button>;
      },
      width: "20%",
    },
  ];

  // const onAddButton = () => {
  //   const randomNumber = parseInt(Math.random() * 1000);
  //   const newData = {
  //     idNum: "" + parseInt(rooms.length + 1),
  //     name: "Name " + randomNumber,
  //     roomType: "23/03/2002",
  //     area: randomNumber + " area",
  //   };

  //   setRoom((pre) => {
  //     return [...pre, newData];
  //   });
  // };

  // const onDeleteButton = (record) => {
  //   Modal.confirm({
  //     title: "Are you sure, you want to delete this record?",
  //     okText: "Yes",
  //     okType: "danger",
  //     onOk: () => {
  //       setRoom((pre) => {
  //         return pre.filter((data) => data.idNum !== record.idNum);
  //       });
  //     },
  //   });
  // };

  // const onFinish = (values) => {
  //   console.log(editingRow);
  //   const updateDataSource = [...rooms];
  //   updateDataSource.splice(editingRow - 1, 1, {
  //     ...values,
  //     idNum: editingRow,
  //   });
  //   console.log(updateDataSource);
  //   setRoom(updateDataSource);
  //   setEditingRow(null);
  // };

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
          <Button
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Add new
          </Button>
        </div>
      </div>
      <Form form={form} className="form">
        <Table
          columns={columns}
          dataSource={vouchers}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default PromotionTable;
