import React, { useState, useContext, useEffect } from "react";
import { getAllRoomType } from "../../../../api/RoomTypeAPI";

import { fetchBookingByDate } from "../../../../api/BookingAPI";

import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/Booking/BookingTable";

import "./booking.css";

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AppContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [bookingType, setBookingType] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const [listType, setListType] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (listType) {
      getAllRoomType(user?.position)
        .then(({ data }) => {
          console.log(data);
          setListType(data);
        })
        .finally(() => setIsLoading(false));
    }

    if (from && to) {
      fetchBookingByDate(user?.position, from, to)
        .then(({ data }) => {
          setIsLoading(false);
          setRooms(data.listRoom);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          ErrorAlert("Lỗi khi lấy dữ liệu phòng.");
        })
        .finally(() => setIsLoading(false));
    }
    else {
      setIsLoading(false);
      setRooms([]);
    }
  }, [user?.position, from, to, bookingType]);
  return (
    <div className="container">
      <div className="bookingContainer">
        <BookingTable
          isLoading={isLoading}
          user={user}
          rooms={rooms}
          bookingType={bookingType}
          setBookingType={setBookingType}
          setRooms={setRooms}
          setFrom={setFrom}
          from={from}
          listType={listType}
          setTo={setTo}
          to={to}
          positionUser={user.position}
        ></BookingTable>
      </div>
    </div>
  );
};

export default Booking;
