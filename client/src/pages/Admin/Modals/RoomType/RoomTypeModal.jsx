import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const RoomTypeModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Tên loại phòng"></AddInput>
      </div>
    </div>
  );
};

export default RoomTypeModal;
