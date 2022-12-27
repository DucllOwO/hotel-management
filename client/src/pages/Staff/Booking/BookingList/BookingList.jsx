import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/BookingList/BookingListTable";
import "./bookingList.css";

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    document.title = "Booking List | Parallel Shine";
    const fetchBooking = async () => {
      const { data } = await userRequest.get("/bookings/list", {
        params: { user: { position: user?.position }, type: "customer" },
      });
      console.log(data);
      setBooking(data.data);
    };
    fetchBooking();
  }, []);
  return (
    <div className="bookingContainer">
      <BookingTable booking={booking}></BookingTable>
    </div>
  );
};

export default BookingList;
