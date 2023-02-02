import "./position.css";
import React, { useState, useEffect, useContext } from "react";
import PositionTable from "../Tables/Position/PositionTable";

import { AppContext } from "../../../context/AppContext";
import { PositionProvider } from "../../../context/PositionContext";
import { fetchPosition } from "../../../api/PositionAPI";
import ErrorAlert from "../../../components/Error/Alert/ErrorAlert";

const Position = () => {
  const [positions, setPositions] = useState(null);
  const { user } = useContext(AppContext);
  useEffect(() => {
    document.title = "Position | Parallel Shine";
    fetchPosition(user?.position)
      .then(({ data }) => {
        setPositions(data);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("Lấy dữ liệu chức vụ từ máy chủ thất bại!!");
      });
  }, [user?.position]);
  return (
    <PositionProvider>
      <div className="positionContainer">
        <PositionTable
          positions={positions}
          setPositions={setPositions}
        ></PositionTable>
      </div>
    </PositionProvider>
  );
};

export default Position;
