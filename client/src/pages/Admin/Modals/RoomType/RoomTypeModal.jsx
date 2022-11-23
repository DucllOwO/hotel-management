import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const RoomTypeModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Name"></AddInput>
      </div>
    </div>
  );
};

export default RoomTypeModal;
