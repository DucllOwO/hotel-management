import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "./customermodal.css";

const CustomerModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Số CCCD"></AddInput>
        <AddInput label="Họ và tên"></AddInput>
        <AddInput label="Ngày sinh"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Số điện thoại"></AddInput>
        <AddInput label="Email"></AddInput>
      </div>
    </div>
  );
};

export default CustomerModal;
