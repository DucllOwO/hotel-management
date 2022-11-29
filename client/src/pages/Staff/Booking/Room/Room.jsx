import React,{useState, useContext, useEffect} from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import RoomTable from "../../Tables/Booking/Room/RoomTable";
import "./room.css";

const AvailableRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("0")
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await userRequest.get("/bookings/room", {
        params: { user: { position: user?.position }, status: status }
      });
      console.log(data);  
      setRooms(data.listRoom);
    };
    fetchRoom();
  }, [status]);
  return (
    <div className="container">
      <div className="bookingContainer">
        <RoomTable
        rooms ={rooms}
        setStatus = {setStatus}></RoomTable>
      </div>
    </div>
  );
};

export default AvailableRoom;
