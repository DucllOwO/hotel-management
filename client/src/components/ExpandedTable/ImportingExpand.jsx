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
      render: (text, record) => {
        return record.amount.toLocaleString();
      },
      align: "center",
    },
    {
      key: "3",
      title: "Đơn giá",
      dataIndex: "unit_price",
      align: "center",
      render: (text, record) => {
        return record.unit_price.toLocaleString();
      },
    },
    {
      key: "4",
      title: "Giá tổng",
      dataIndex: "bed_amount",
      align: "center",
      render: (text, record) => {
        return (record.amount * record.unit_price).toLocaleString();
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
