import React from "react";
import TopBar from "../../../../components/Customer/TopBar/TopBar";
import DetailRoomTable from "../../../../components/Form/DetailForm/Tables/DetailRoomTable";
import styled from "styled-components";
import { Button, Col, Form, Row } from "antd";

const DetailContainer = styled.div`
  justify-content: space-between;
  padding: 0 36px;
  
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 36px;
  
`;
const CustomerReceipt = () => {
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
                <DetailRoomTable dataSource={dataSource}></DetailRoomTable>
            </div>
            <hr />
            <Row justify={"end"}>
                <Col span={12}>
                <div className="noteTitle">Ghi chú</div>
                <div>Note</div>
                </Col>
                <Col span={7}>
                <div className="itemListContainer">
                    <div className="itemList">Tổng tiền phòng: </div>
                    <div className="itemList">Tổng tiền dịch vụ</div>
                    <div className="itemList">Phụ thu</div>
                    <div className="totalTitle">Tổng cộng</div>
                </div>
                </Col>
                <Col span={5}>
                <div className="priceList">
                    500,000
                </div>
                <div className="priceList">
                    100,000
                </div>
                <div className="priceList">
                    50,000
                </div>
                <div className="totalText">
                    650,000
                </div>
                </Col>
            </Row>
            </DetailContainer>
        </div>
    )
}

export default CustomerReceipt;