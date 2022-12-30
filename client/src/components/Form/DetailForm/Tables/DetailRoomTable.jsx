import React, { useState } from "react";
import { Table } from "antd";
import DetailServiceTable from "./DetailServiceTable";

const DetailRoomTable = ({ dataSource }) => {
  const columns = [
    // {
    //   key: "1",
    //   title: "STT",
    //   align: "center",
    //   render: (text, record) => {
    //     return String(record.room_id);
    //   },
    // },
    {
      key: "2",
      title: "Tên Phòng",
      dataIndex: "room_name",
      align: "center",
      render: (text, record) => {
        return String(record.roomInfo.room_name);
      },
    },
    {
      key: "3",
      title: "Loại phòng",
      dataIndex: "room_type",
      align: "center",
      render: (text, record) => {
        return String(record.roomInfo.room_type_id.name);
      },
    },
    {
      key: "4",
      title: "Giờ đầu tiên (đ)",
      dataIndex: "price",
      align: "center",
      render: (value, record) => {
        console.log(record);
        return String(record.roomInfo.price.first_hour_price.toLocaleString());
      },
    },
    {
      key: "5",
      title: "Một giờ (đ)",
      dataIndex: "price",
      align: "center",
      render: (value, record) => {
        console.log(record);
        return String(record.roomInfo.price.hour_price.toLocaleString());
      },
    },
    {
      key: "6",
      title: "Một ngày (đ)",
      dataIndex: "price",
      align: "center",
      render: (value, record) => {
        console.log(record);
        return String(record.roomInfo.price.one_day_price.toLocaleString());
      },
    },
    {
      key: "7",
      title: "Qua đêm (đ)",
      dataIndex: "price",
      align: "center",
      render: (value, record) => {
        console.log(record);
        return String(record.roomInfo.price.overnight_price.toLocaleString());
      },
    },
    // {
    //   key: "7",
    //   title: "Giá",
    //   dataIndex: "price",
    //   align: "center",
    //   render: (value, record) => {
    //     console.log(record);
    //     return String(record.roomInfo.price.toLocaleString());
    //   },
    // },
  ];

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        style={{ width: "100%" }}
        scroll={{ y: "100%" }}
        rowKey={(row) => {
          return row.room_id;
        }}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <DetailServiceTable
                dataSource={
                  record?.inventory_detail ? record?.inventory_detail : []
                }
              ></DetailServiceTable>
            );
          },
        }}
        bordered={true}
      ></Table>
    </div>
  );
};

export default DetailRoomTable;
