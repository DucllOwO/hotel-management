import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const HRModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Họ và tên"></AddInput>
        <AddInput label="Ngày sinh"></AddInput>
        <AddInput label="Số điện thoại"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Địa chỉ"></AddInput>
        <AddInput label="Ngày vào làm"></AddInput>
        <AddInput label="Lương"></AddInput>
      </div>
    </div>
  );
};

export default HRModal;
