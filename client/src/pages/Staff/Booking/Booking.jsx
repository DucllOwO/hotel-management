import React,{useState, useContext, useEffect} from "react";
import { userRequest } from "../../../api/api";
import { AppContext } from "../../../context/AppContext";
import BookingTable from "../Tables/Booking/BookingTable";
import "./booking.css";

const Booking = () => {
  // const [booking, setCustomer] = useState([]);
  // const { user } = useContext(AppContext);

  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     const { data } = await userRequest.get("/users", {
  //       params: { user: { position: user?.position }, type: "customer" }
  //     });
  //     console.log(data.customers);
  //     setCustomer(data.customers);
  //     console.log(customer)
  //   };
  //   fetchCustomer();
  // }, []);
  return (
    <div className="container">
      <div className="bookingContainer">
        <BookingTable></BookingTable>
      </div>
    </div>
  );
};

export default Booking;
