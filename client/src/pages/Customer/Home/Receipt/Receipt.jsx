import React from "react";
import TopBar from "../../../../components/Customer/TopBar/TopBar";
import DetailRoomTable from "../../../../components/Form/DetailForm/Tables/DetailRoomTable";
import styled from "styled-components";
import { Button, Col, Form, Row, Table } from "antd";

const DetailContainer = styled.div`
  justify-content: space-between;
  padding: 0 150px;
  
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 150px;
  
`;
const CustomerReceipt = () => {
    const columns = [
        {
          key: "1",
          title: "Tên Phòng",
          dataIndex: "room_name",
          align: "center",
          render: (text, record) => {
            return String(record.roomInfo.room_name);
          },
        },
        {
          key: "2",
          title: "Loại phòng",
          dataIndex: "room_type",
          align: "center",
          render: (text, record) => {
            return String(record.roomInfo.room_type_id.name);
          },
        },
        {
          key: "3",
          title: "Giờ đầu tiên (đ)",
          dataIndex: "price",
          align: "center",
          render: (value, record) => {
            console.log(record);
            return String(
              record.roomInfo.price.first_hour_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
          },
        },
        {
          key: "4",
          title: "Một giờ (đ)",
          dataIndex: "price",
          align: "center",
          render: (value, record) => {
            console.log(record);
            return String(
              record.roomInfo.price.hour_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
          },
        },
        {
          key: "5",
          title: "Một ngày (đ)",
          dataIndex: "price",
          align: "center",
          render: (value, record) => {
            console.log(record);
            return String(
              record.roomInfo.price.one_day_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
          },
        },
        {
          key: "6",
          title: "Qua đêm (đ)",
          dataIndex: "price",
          align: "center",
          render: (value, record) => {
            console.log(record);
            return String(
              record.roomInfo.price.overnight_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
          },
        },
      ];
    const dataSource = [{
        roomInfo:{
            room_name: "A001",
            room_type_id: {name: "Phòng đơn"},
            price:{
                first_hour_price: 150000,
                hour_price: 20000,
                one_day_price: 300000,
                overnight_price: 200000,
            }
        }
    }]
    return (
        <div>
            <TopBar/>
            <DetailContainer>
                
            <div className="modal">
                <div className="left">
                <Form.Item label="Thời gian">
                    <span className="formItem">1/1/2023</span>
                </Form.Item>
                <Form.Item label="Khách hàng">
                    <span className="formItem">
                    Việt Hoàng | 321629126
                    </span>
                </Form.Item>
                </div>
                <div className="right">
                <Form.Item label="Check-in">
                    <span className="formItem">
                    1/1/2023
                    </span>
                </Form.Item>
                <Form.Item label="Check-out">
                    <span className="formItem">
                    1/1/2023
                    </span>
                </Form.Item>
                </div>
            </div>
            <div>
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}
                    style={{ width: "100%" }}
                    scroll={{ y: "100%" }}
                    rowKey={(row) => {
                    return row.room_id;
                    }}
                    bordered={true}
                ></Table>
            </div>
            <hr />
            <Row justify={"end"}>
                <Col span={12}>
                <div className="noteTitle">Ghi chú</div>
                <div>Note</div>
                </Col>
                <Col span={7}>
                <div className="itemListContainer">
                    {/* <div className="itemList">Tổng tiền phòng: </div>
                    <div className="itemList">Tổng tiền dịch vụ:</div>
                    <div className="itemList">Phụ thu:</div> */}
                    <div className="totalTitle">Tổng cộng:</div>
                </div>
                </Col>
                <Col span={5}>
                {/* <div className="priceList">
                    500,000
                </div>
                <div className="priceList">
                    100,000
                </div>
                <div className="priceList">
                    50,000
                </div> */}
                <div className="totalText">
                    500,000
                </div>
                </Col>
            </Row>
            </DetailContainer>
            <ButtonContainer>
                <Button type="primary">Xong</Button>
            </ButtonContainer>
        </div>
    )
}

export default CustomerReceipt;