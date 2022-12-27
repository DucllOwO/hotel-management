import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { fetchBookingByStatus } from "../../../../api/BookingListAPI";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/BookingList/BookingListTable";
import "./bookingList.css";

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const { user } = useContext(AppContext);
  const [status, setStatus] = useState("0");

  useEffect(() => {
    fetchBookingByStatus(user?.position, status)
    .then(({data}) => {
      setBooking(data);
      console.log(data)
    })
  }, [status]);
  return (
    <div className="bookingContainer">
      <BookingTable booking={booking} setStatus={setStatus} setBooking={setBooking}></BookingTable>
    </div>
  );
};

export default BookingList;
