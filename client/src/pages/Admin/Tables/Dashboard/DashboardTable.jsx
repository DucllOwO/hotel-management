import { Table } from "antd";
import React from "react";

const data = [];

const DashboardTable = () => {
  const columns = [
    {
      key: "1",
      title: "Day",
      dataIndex: "day",
      fixed: "left",
      render: (text, record) => {},
    },
    {
      key: "2",
      title: "Thu nhập",
      dataIndex: "income",
      render: (text, record) => {},
    },
    {
      key: "3",
      title: "Chi phí",
      dataIndex: "outcome",
      render: (text, record) => {},
    },
    {
      key: "4",
      title: "Chi phí",
      dataIndex: "outcome",
      render: (text, record) => {},
    },
    {
      key: "5",
      title: "Lợi nhuận",
      dataIndex: "profit",
      fixed: "right",
      render: (text, record) => {},
    },
    {
      key: "6",
      title: "Số lượng khách",
      dataIndex: "customer_amount",
      render: (text, record) => {},
    },
    {
      key: "7",
      title: "Lượt đặt phòng",
      dataIndex: "booking_amount",
      render: (text, record) => {},
    },
  ];

  return (
    <div className="table">
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 350 }}
        rowKey={(row) => row.idNum}
        style={{ width: "100%" }}
      ></Table>
    </div>
  );
};

export default DashboardTable;
