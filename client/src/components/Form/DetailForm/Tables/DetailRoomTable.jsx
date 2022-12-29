import React, { useState } from "react";
import { Table } from "antd";

const DetailRoomTable = ({dataSource}) => {
  //   const [dataSource, setDataSource] = useState();

  // const dataSource = [
  //   {
  //     no: "1",
  //     roomID: "Room01",
  //     roomType: "President",
  //     area: "200",
  //     price: "2000000",
  //   },
  //   {
  //     no: "1",
  //     roomID: "Room01",
  //     roomType: "President",
  //     area: "200",
  //     price: "2000000",
  //   },
  //   {
  //     no: "1",
  //     roomID: "Room01",
  //     roomType: "President",
  //     area: "200",
  //     price: "2000000",
  //   },
  //   {
  //     no: "1",
  //     roomID: "Room01",
  //     roomType: "President",
  //     area: "200",
  //     price: "2000000",
  //   },
  //   {
  //     no: "1",
  //     roomID: "Room01",
  //     roomType: "President",
  //     area: "200",
  //     price: "2000000",
  //   },
  // ];

  const columns = [
    {
      key: "1",
      title: "STT",
      align: "center",
      render: (text, record) => {
        return String(record.no);
      },
    },
    {
      key: "2",
      title: "Số Phòng",
      dataIndex: "room_name",
      align: "center",
      render: (text, record) => {
        return record.room_name ? String(record.room_name) : "";
      },
    },
    {
      key: "3",
      title: "Loại phòng",
      dataIndex: "room_type",
      align: "center",
      render: (text, record) => {
        return record.room_type ? String(record.room_type) : "";
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
      key: "5",
      title: "Giá",
      dataIndex: "price",
      align: "center",
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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
