import { Button } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { fetchBookingByDate } from "../../../../api/BookingAPI";
import BottomBar from "../../../../components/Admin/BottomBar/BottomBar";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/Booking/BookingTable";

import "./booking.css";

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AppContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(from)
    console.log(to)
    if (from && to) {
      setIsLoading(true);
      fetchBookingByDate(user?.position, from, to)
        .then(({ data }) => {
          setIsLoading(false);
          setRooms(data.listRoom);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          ErrorAlert("Lỗi khi lấy dữ liệu phòng.");
        });
    }
  }, [user?.position, from, to]);
  return (
    <div className="bookingContainer">
      <BookingTable
        setRooms={setRooms}
        rooms={rooms}
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
        isLoading={isLoading}
        user={user}
      ></BookingTable>
    </div>
  );
};

export default Booking;
