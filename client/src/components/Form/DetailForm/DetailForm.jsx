import { Button, Col, Form, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import Column from "antd/es/table/Column";
import React from "react";
import "./detailform.css";
import DetailRoomTable from "./Tables/DetailRoomTable";
import DetailServiceTable from "./Tables/DetailServiceTable";

const DetailForm = ({ receipt, rowIndex }) => {
  return (
    <div>
      <div className="modal">
        <div className="left">
          <Form.Item label="Thời gian">
            <span className="formItem">
              {receipt[rowIndex].established_date}
            </span>
          </Form.Item>
          <Form.Item label="Khách hàng">
            <span className="formItem">
              {receipt[rowIndex].booking_id.customer_id.fullname +
                " | " +
                receipt[rowIndex].booking_id.customer_id.id}
            </span>
          </Form.Item>
        </div>
        <div className="right">
          <Form.Item label="Check-in">
            <span className="formItem">{receipt[rowIndex].checkin_time}</span>
          </Form.Item>
          <Form.Item label="Check-out">
            <span className="formItem">{receipt[rowIndex].checkout_time}</span>
          </Form.Item>
        </div>
      </div>
      <div>
        <DetailRoomTable></DetailRoomTable>
      </div>
      <div>
        <DetailServiceTable></DetailServiceTable>
      </div>
      <hr />
      <Row justify={"end"}>
        <Col span={12}>
          <div className="noteTitle">Ghi chú</div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </div>
        </Col>
        <Col span={7}>
          <div className="itemListContainer">
            <div className="itemList">Tổng tiền phòng</div>
            <div className="itemList">Tổng tiền dịch vụ</div>
            <div className="itemList">Phụ thu</div>
            <div className="totalTitle">Tổng cộng</div>
          </div>
        </Col>
        <Col span={5}>
          <div className="priceList">200.000đ</div>
          <div className="priceList">200.000đ</div>
          <div className="priceList">200.000đ</div>
          <div className="totalText">10.000.000đ</div>
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
