import { Card, Col, Empty, Row, Table } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React from "react";
import UtilitiesButton from "../Button/UtilitiesButton/UtilitiesButton";

const RoomTypeExpand = ({ utils = [], ...prices }) => {
  const priceTypes = {
    firstHourPrice: "Giờ đầu tiên",
    overNightPrice: "Qua đêm",
    oneDayPrice: "Một ngày",
    hourPrice: "Một giờ",
  };

  const columns = [
    {
      key: "1",
      title: "Loại giờ",
      render: (text, record) => {
        return String(priceTypes[Object.keys(record)[0]]);
      },
      width: 300,
    },
    {
      key: "2",
      title: "Giá",
      dataIndex: [
        "firstHourPrice",
        "overNightPrice",
        "oneDayPrice",
        "hourPrice",
      ],
      render: (text, record) => {
        return <p>{Object.values(record)[0].toLocaleString()}</p>;
      },
    },
  ];

  return (
    <div id="roomTypeExpandContainer">
      <Row justify="space-around">
        <Col xs={24} xl={8}>
          <Table
            dataSource={createDataSource(prices)}
            columns={columns}
            pagination={false}
            bordered={true}
          ></Table>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Tiện ích" bordered={true} style={{ width: "30vw" }}>
            {utils.length > 0 ? (
              utils.map((util) => (
                <CheckableTag
                  key={util.id}
                  checked={true}
                  style={{
                    margin: "5px 0 0 5px",
                    fontSize: 18,
                    padding: 5,
                    border: "1px solid",
                  }}
                >
                  {util.room_feature.name}
                </CheckableTag>
              ))
            ) : (
              <Empty description={"Không có dữ liệu tiện ích của phòng"} />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );

  function createDataSource(prices) {
    let priceArray = Object.entries(prices);

    return priceArray.map((price) => {
      return { [price[0]]: price[1] };
    });
  }
};

export default RoomTypeExpand;
