import React, { useState, useContext, useEffect } from "react";
import RoomTypeTable from "../../Tables/RoomType/RoomTypeTable";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import "./roomtype.css";

const RoomType = () => {
  const [types, setTypes] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchRoomType = async () => {
      const { data } = await userRequest.get("/roomtypes", {
        params: { user: { position: user?.position } },
      });
      console.log(data);
      setTypes(data);
    };
    fetchRoomType();
  }, [user?.position]);
  return (
    <div className="roomTypeContainer">
      <RoomTypeTable roomTypes={types}></RoomTypeTable>
    </div>
  );
};

export default RoomType;
