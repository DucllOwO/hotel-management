import React,{useState, useContext, useEffect} from "react";
import RoomsTable from "../../Tables/Rooms/RoomsTable";
import Topbar from "../../../../components/Topbar/Topbar";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import "./rooms.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await userRequest.get("/rooms", {
        params: { user: { position: user?.position } },
      });
      console.log(data)
      setRooms(data.rooms);
    };

    fetchRoom();
  }, []);
  return (
    <div className="container">
      <div className="roomsContainer">
        <RoomsTable
          rooms={rooms}>
          </RoomsTable>
      </div>
    </div>
  );
};

export default Rooms;
