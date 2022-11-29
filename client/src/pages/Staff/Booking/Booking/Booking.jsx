import React,{useState, useContext, useEffect} from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/Booking/BookingTable";
import "./booking.css";

const Booking = () => {
  const [room, setRoom] = useState([]);
  const { user } = useContext(AppContext);
  const [status, setStatus] = useState("0");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await userRequest.get("/bookings/room", {
        params: { user: { position: user?.position }, from: from, to: to }
      });
      console.log(from)
      setRoom(data.listRoom);
    };
    fetchBooking();
  }, [status, from, to]);
  return (
    <div className="container">
      <div className="bookingContainer">
        <BookingTable
        rooms = {room}
        setStatus = {setStatus}
        setFrom = {setFrom}
        setTo = {setTo}></BookingTable>
      </div>
    </div>
  );
};

export default Booking;
