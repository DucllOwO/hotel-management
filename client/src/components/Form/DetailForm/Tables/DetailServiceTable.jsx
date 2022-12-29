import React from "react";
import { Table } from "antd";

const DetailServiceTable = ({ dataSource }) => {
  // const dataSource = [
  //   {
  //     no: "1",
  //     service: "Cocacola",
  //     amount: "3",
  //     unitPrice: "15000",
  //     total: "45000",
  //   },
  //   {
  //     no: "1",
  //     service: "Cocacola",
  //     amount: "3",
  //     unitPrice: "15000",
  //     total: "45000",
  //   },
  //   {
  //     no: "1",
  //     service: "Cocacola",
  //     amount: "3",
  //     unitPrice: "15000",
  //     total: "45000",
  //   },
  //   {
  //     no: "1",
  //     service: "Cocacola",
  //     amount: "3",
  //     unitPrice: "15000",
  //     total: "45000",
  //   },
  //   {
  //     no: "1",
  //     service: "Cocacola",
  //     amount: "3",
  //     unitPrice: "15000",
  //     total: "45000",
  //   },
  // ];

  const columns = [
    // {
    //   key: "1",
    //   title: "STT",
    //   dataIndex: "No",
    //   align: "center",
    //   render: (text, record) => {
    //     return String(record.item_id.id);
    //   },
    // },
    {
      key: "2",
      title: "Tên dịch vụ",
      dataIndex: "item_name",
      align: "center",
      render: (text, record) => {
        return record.item_id.name ? String(record.item_id.name) : "";
      },
    },
    {
      key: "3",
      title: "Số lượng",
      dataIndex: "amount",
      align: "center",
      render: (text, record) => {
        return record.amount ? String(record.amount.toLocaleString()) : "";
      },
    },
    {
      key: "4",
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
      render: (text, record) => {
        return record.price ? String(record.price.toLocaleString()) : "";
      },
    },
    {
      key: "5",
      title: "Tổng cộng",
      dataIndex: "total_cost",
      align: "center",
      render: (text, record) => {
        return (record.price * record.amount).toLocaleString();
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
        rowKey={(row) => row}
        bordered={true}
      ></Table>
    </div>
  );
};

export default DetailServiceTable;
