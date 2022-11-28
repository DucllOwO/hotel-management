import React,{useState, useContext, useEffect} from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/Booking/BookingTable";
import "./booking.css";

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("0")
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await userRequest.get("/bookings", {
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
        <BookingTable
        rooms ={rooms}
        setStatus = {setStatus}></BookingTable>
      </div>
    </div>
  );
};

export default Booking;
