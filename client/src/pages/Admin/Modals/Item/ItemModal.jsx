import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const ItemModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Name"></AddInput>
        <AddInput label="Minimum"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Price"></AddInput>
      </div>
    </div>
  );
};

export default ItemModal;
