import { Card, Col, Empty, Row, Table } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React from "react";
import UtilitiesButton from "../Button/UtilitiesButton/UtilitiesButton";

const BookingListExpand = ({ utils = [], roomTypeSource, ...prices }) => {
  const roomTypeColumns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "room_type_id",
      width: "5%",
      align: "center",
    },
    {
      key: "2",
      title: "Tên phòng",
      dataIndex: "room_name",
      width: "20%",
      align: "center",
    },
    {
      key: "3",
      title: "Số lượng khách",
      dataIndex: "max_customers",
      align: "center",
      // render: (text, record) => {
      //   return <p>{text}</p>;
      // },
    },
    {
      key: "4",
      title: "Số giường",
      dataIndex: "bed_amount",
      align: "center",
      // render: (text, record) => {
      //   return <p>{text}</p>;
      // },
    },
    {
      key: "5",
      title: "Diện tích (m2)",
      dataIndex: "area",
      align: "center",
    },
    {
      key: "6",
      title: "Giá ngày",
      dataIndex: "one_day_price",
      align: "center",
    },
  ];

  return (
    <div id="BookingListExpandContainer">
      <Row justify="space-around">
        {/* <Col xs={24} xl={8}>
          <Table
            dataSource={createDataSource(prices)}
            columns={columns}
            pagination={false}
            bordered={true}
          ></Table>
        </Col> */}
        <Col xs={24} xl={8}>
          <Table
            dataSource={roomTypeSource}
            columns={roomTypeColumns}
            pagination={false}
            bordered={true}
          ></Table>
        </Col>
      </Row>
    </div>
  );
};

export default BookingListExpand;
