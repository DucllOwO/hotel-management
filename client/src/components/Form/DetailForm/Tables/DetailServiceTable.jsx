import React from "react";
import { Table } from "antd";

const DetailServiceTable = ({dataSource}) => {
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
      title: "Tên dịch vụ",
      dataIndex: "item_name",
      align: "center",
      render: (text, record) => {
        return record.item_name ? String(record.item_name) : "";
      },
    },
    {
      key: "3",
      title: "Số lượng",
      dataIndex: "amount",
      align: "center",
      render: (text, record) => {
        return record.amount ? String(record.amount) : "";
      },
    },
    {
      key: "4",
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
      render: (text, record) => {
        return record.price ? String(record.price) : "";
      },
    },
    {
      key: "5",
      title: "Tổng cộng",
      dataIndex: "total_cost",
      align: "center",
      render: (text, record) => {
        return record.total_cost ? String(record.total_cost) : "";
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

export default DetailServiceTable;
