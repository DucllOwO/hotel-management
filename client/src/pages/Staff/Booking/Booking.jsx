import React from "react";
import BookingTable from "../Tables/Booking/BookingTable";
import "./booking.css";

const Booking = () => {
  return (
    <div className="container">
      <div className="bookingContainer">
        <div>Booking</div>
        <BookingTable></BookingTable>
      </div>
    </div>
  );
};

export default Booking;
