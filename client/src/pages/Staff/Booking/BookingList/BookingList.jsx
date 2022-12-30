import React, { useState, useContext, useEffect } from "react";
import { fetchBookingByStatus } from "../../../../api/BookingListAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../../context/AppContext";
import BookingTable from "../../Tables/Booking/BookingList/BookingListTable";
import "./bookingList.css";

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const { user } = useContext(AppContext);
  const [status, setStatus] = useState("0");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    document.title = "Booking List | Parallel Shine";
    fetchBookingByStatus(user?.position, status)
      .then(({ data }) => {
        setBooking(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("Lỗi khi lấy dữ liệu danh sách đặt phòng.");
      })
      .finally(() => setIsLoading(false));
  }, [status]);
  return (
    <div className="bookingContainer">
      <BookingTable
        isLoading={isLoading}
        booking={booking}
        status={status}
        setStatus={setStatus}
        setBooking={setBooking}
      ></BookingTable>
    </div>
  );
};

export default BookingList;
