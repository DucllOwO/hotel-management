import React, { useState } from "react";
import { Table } from "antd";

const DetailRoomTable = () => {
  //   const [dataSource, setDataSource] = useState();

  const dataSource = [
    {
      no: "1",
      roomID: "Room01",
      roomType: "President",
      area: "200",
      price: "2000000",
    },
    {
      no: "1",
      roomID: "Room01",
      roomType: "President",
      area: "200",
      price: "2000000",
    },
    {
      no: "1",
      roomID: "Room01",
      roomType: "President",
      area: "200",
      price: "2000000",
    },
    {
      no: "1",
      roomID: "Room01",
      roomType: "President",
      area: "200",
      price: "2000000",
    },
    {
      no: "1",
      roomID: "Room01",
      roomType: "President",
      area: "200",
      price: "2000000",
    },
  ];

  const columns = [
    {
      key: "1",
      title: "STT",
      dataIndex: "No",
      align: "center",
      render: (text, record) => {
        return String(record.no);
      },
    },
    {
      key: "2",
      title: "Số Phòng",
      dataIndex: "roomID",
      align: "center",
      render: (text, record) => {
        return record.roomID ? String(record.roomID) : "";
      },
    },
    {
      key: "3",
      title: "Loại phòng",
      dataIndex: "roomType",
      align: "center",
      render: (text, record) => {
        return record.roomType ? String(record.roomType) : "";
      },
    },
    {
      key: "4",
      title: "Diện tích (m2)",
      dataIndex: "area",
      align: "center",
      render: (text, record) => {
        return record.area ? String(record.area) : "";
      },
    },
    {
      key: "3",
      title: "Giá",
      dataIndex: "price",
      align: "center",
      render: (text, record) => {
        return record.price ? String(record.price) : "";
      },
    },
  ];

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        style={{ width: "100%" }}
        scroll={{ y: 150 }}
        rowKey={(row) => row.no}
      ></Table>
    </div>
  );
};

export default DetailRoomTable;
