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
      title: "Giá",
      dataIndex: "price",
      align: "center",
      render: (value, record) => {
        return String(record.roomInfo.price.toLocaleString());
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
