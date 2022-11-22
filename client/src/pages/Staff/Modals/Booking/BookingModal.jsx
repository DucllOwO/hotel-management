import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "./bookingmodal.css";

const BookingModal = () => {
  return (
    <div className="cusModal">
      <div className="left">
        <AddInput label="ID Number"></AddInput>
        <AddInput label="Full Name"></AddInput>
        <AddInput label="Birthday"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Phone Number"></AddInput>
        <AddInput label="Address"></AddInput>
        <AddInput label="Email"></AddInput>
      </div>
    </div>
  );
};

export default BookingModal;
