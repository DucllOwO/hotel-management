import { Col, Row, Table } from "antd";
import React from "react";

const ImportingExpand = ({ dataSource }) => {
  const importingColumns = [
    {
      key: "1",
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "30%",
      align: "center",
      render: (text, record) => {
        return record.item_id.name;
      },
    },
    {
      key: "2",
      title: "Số lượng",
      dataIndex: "amount",
      width: "20%",
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
      align: "center",
    },
    {
      key: "3",
      title: "Đơn giá (đ)",
      dataIndex: "unit_price",
      align: "center",
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
    },
    {
      key: "4",
      title: "Giá tổng (đ)",
      dataIndex: "bed_amount",
      align: "center",
      render: (text, record) => {
        return (record.amount * record.unit_price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  ];

  return (
    <div id="BookingListExpandContainer">
      <Row justify="space-around">
        <Col xs={24} xl={8}>
          <Table
            dataSource={dataSource}
            columns={importingColumns}
            pagination={false}
            bordered={true}
          ></Table>
        </Col>
      </Row>
    </div>
  );
};

export default ImportingExpand;
