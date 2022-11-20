import "./position.css";
import React, { useState } from "react";
import Topbar from "../../../components/Topbar/Topbar";
import PositionTable from "../Tables/Position/PositionTable";

const Position = () => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div className="container">
      <div className="positionContainer">
        <Topbar
          name="Huỳnh Thế Vĩ"
          img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg"
          position="Manager"
        ></Topbar>
        <div>Position</div>
        <PositionTable></PositionTable>
      </div>
    </div>
  );
};

export default Position;
