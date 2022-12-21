import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const ItemModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Tên sản phẩm"></AddInput>
        <AddInput label="Số lượng"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Giá"></AddInput>
      </div>
    </div>
  );
};

export default ItemModal;
