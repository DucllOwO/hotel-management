import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const UtilitiesModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Name"></AddInput>
      </div>
    </div>
  );
};

export default UtilitiesModal;
