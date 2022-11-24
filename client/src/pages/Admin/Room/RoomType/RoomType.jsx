import React from "react";
import RoomTypeTable from "../../Tables/RoomType/RoomTypeTable";
import "./roomtype.css";

const RoomType = () => {
  return (
    <div className="container">
      <div className="roomTypeContainer">
        <RoomTypeTable></RoomTypeTable>
      </div>
    </div>
  );
};

export default RoomType;
