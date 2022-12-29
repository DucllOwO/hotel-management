import React, { useState, useContext, useEffect } from "react";
import RoomTypeTable from "../../Tables/RoomType/RoomTypeTable";
import { AppContext } from "../../../../context/AppContext";
import "./roomtype.css";
import { getAllRoomType } from "../../../../api/RoomTypeAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { getAllRoomFeature } from "../../../../api/RoomFeatureAPI";
import LocalStorage from "../../../../Utils/localStorage";

const RoomType = () => {
  const [types, setTypes] = useState([]);

  const { user } = useContext(AppContext);

  useEffect(() => {
    document.title = "Room Type | Parallel Shine";
    Promise.all([
      getAllRoomType(user.position),
      getAllRoomFeature(user.position),
    ])
      .then((res) => {
        setTypes(res[0].data);
        LocalStorage.setItem("utils", res[1].data.data);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("Lấy dữ liệu loại phòng thất bại!!");
      });
  }, [user?.position]);
  return (
    <div className="roomTypeContainer">
      <RoomTypeTable
        roomTypes={types}
        setRoomTypes={setTypes}
        positionUser={user.position}
      ></RoomTypeTable>
    </div>
  );
};

export default RoomType;
