import React,{useState, useContext, useEffect} from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/Booking/BookingTable";
import "./booking.css";

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await userRequest.get("/bookings/list", {
        params: { user: { position: user?.position }, type: "customer" }
      });
      console.log(data);
      setBooking(data.data);
    };
    fetchBooking();
  }, []);
  return (
    <div className="container">
      <div className="bookingContainer">
        <BookingTable
        booking = {booking}></BookingTable>
      </div>
    </div>
  );
};

export default Booking;
