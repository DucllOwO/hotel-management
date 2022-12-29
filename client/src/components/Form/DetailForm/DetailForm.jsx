import { Button, Col, Form, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import Column from "antd/es/table/Column";
import React from "react";
import "./detailform.css";
import DetailRoomTable from "./Tables/DetailRoomTable";
import DetailServiceTable from "./Tables/DetailServiceTable";

const DetailForm = ({ receipt, usedRoom, usedService }) => {
  return (
    <div>
      <div className="modal">
        <div className="left">
          <Form.Item label="Thời gian">
            <span className="formItem">
              {receipt.established_date}
            </span>
          </Form.Item>
          <Form.Item label="Khách hàng">
            <span className="formItem">
              {/* {receipt.booking_id.customer_id.fullname +
                " | " +
                receipt.booking_id.customer_id.id} */}
            </span>
          </Form.Item>
        </div>
        <div className="right">
          <Form.Item label="Check-in">
            <span className="formItem">
              {receipt.checkin_time}
              </span>
          </Form.Item>
          <Form.Item label="Check-out">
            <span className="formItem">
              {receipt.checkout_time}
            </span>
          </Form.Item>
        </div>
      </div>
      <div>
        <DetailRoomTable
          dataSource={usedRoom}
        ></DetailRoomTable>
      </div>
      <div>
        <DetailServiceTable
          dataSource={usedService}
        ></DetailServiceTable>
      </div>
      <hr />
      <Row justify={"end"}>
        <Col span={12}>
          <div className="noteTitle">Ghi chú</div>
          <div>
            {receipt?.note}
          </div>
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
          <div className="priceList">{receipt.rent_cost}</div>
          <div className="priceList">{receipt.service_cost}</div>
          <div className="priceList">{receipt.surcharge ?  receipt.surcharge : "0"}</div>
          <div className="totalText">{receipt.total_cost}</div>
        </Col>
      </Row>
      {/* <Row justify={"end"}>
          <div className="itemList">Tổng tiền phòng</div>
          <div>200.000đ</div>
        </Row>
        <Row justify={"end"}>
          <div className="itemList">Tổng dịch vụ</div>
          <div>200.000đ</div>
        </Row>
        <Row justify={"end"}>
          <div className="itemList">Phụ thu</div>
          <div>200.000đ</div>
        </Row>
        <Row justify={"end"}>
          <div className="itemList">Giảm giá</div>
          <div>200.00đ</div>
        </Row> */}
    </div>
  );
};

export default DetailForm;
