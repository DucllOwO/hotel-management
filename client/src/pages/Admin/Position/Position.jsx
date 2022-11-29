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
    fetchPosition(user?.position)
      .then(({ data }) => {
        setPositions(data);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("Fetch position data error!!");
      });
  }, [user?.position]);
  return (
    <PositionProvider>
      <div className="container">
        <div className="positionContainer">
          <div>Position</div>
          <PositionTable
            positions={positions}
            setPositions={setPositions}
          ></PositionTable>
        </div>
      </div>
    </PositionProvider>
  );
};

export default Position;
