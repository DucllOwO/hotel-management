import "./position.css";
import React, { useState, useEffect, useContext } from "react";
import PositionTable from "../Tables/Position/PositionTable";
import { userRequest } from "../../../api/api";
import { AppContext } from "../../../context/AppContext";
import { PositionProvider } from "../../../context/PositionContext";
import ErrorAlert from "../../../components/Error/Alert/ErrorAlert";

const Position = () => {
  const [positions, setPositions] = useState(null);
  const { user } = useContext(AppContext);
  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const { data } = await userRequest.get("/positions", {
          params: { user: { position: user?.position } },
        });

        setPositions(data.data);
      } catch (error) {
        console.log(error);
        ErrorAlert("Fetch position data error");
      }
    };

    fetchPosition();
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
