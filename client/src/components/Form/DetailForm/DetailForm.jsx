import { Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import "./detailform.css";
import DetailRoomTable from "./Tables/DetailRoomTable";
import DetailServiceTable from "./Tables/DetailServiceTable";

const DetailForm = () => {
  return (
    <Form>
      <div className="modal">
        <div className="left">
          <Form.Item label="Thời gian">
            <span className="formItem">03 Nov 2022 12:18:00</span>
          </Form.Item>
          <Form.Item label="Khách hàng">
            <span className="formItem">Thế Vĩ</span>
          </Form.Item>
        </div>
        <div className="right">
          <Form.Item label="Check-in">
            <span className="formItem">01 Nov 2022 12:18:00</span>
          </Form.Item>
          <Form.Item label="Check-out">
            <span className="formItem">03 Nov 2022 12:18:00</span>
          </Form.Item>
        </div>
      </div>
      <hr />
      <div className="modal">
        <DetailRoomTable></DetailRoomTable>
        <hr />
      </div>
      <hr />
      <div className="modal">
        <DetailServiceTable></DetailServiceTable>
        <hr />
      </div>
      <hr />
      <div className="modal">
        <div className="left"></div>
        <div className="right">
          <Form.Item className="formItem">
            <div className="totalContainer">
              <span className="discountTitle">Discount</span>
              <span className="discountPrice">400.000đ</span>
            </div>
          </Form.Item>
          <Form.Item className="formItem">
            <div className="totalContainer">
              <span className="title">Total</span>
              <span className="price">400.000đ</span>
            </div>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default DetailForm;
