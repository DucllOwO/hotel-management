import "./position.css";
import React, { useState, useEffect, useContext } from "react";
import PositionTable from "../Tables/Position/PositionTable";
import { userRequest } from "../../../api/api";
import { AppContext } from "../../../context/AppContext";

const Position = () => {
  const [positions, setPositions] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchPosition = async () => {
      const { data } = await userRequest.get("/positions", {
        params: { user: { position: user?.position } },
      });

      setPositions(data.data);
    };

    fetchPosition();
  }, [user?.position]);
  return (
    <div className="container">
      <div className="positionContainer">
        <div>Position</div>
        <PositionTable
          positions={positions}
          setPositions={setPositions}
        ></PositionTable>
      </div>
    </div>
  );
};

export default Position;
