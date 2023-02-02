import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const UtilitiesModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Tên tiện ích"></AddInput>
      </div>
    </div>
  );
};

export default UtilitiesModal;
