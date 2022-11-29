import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const HRModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Full Name"></AddInput>
        <AddInput label="Birthday"></AddInput>
        <AddInput label="Phone"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Address"></AddInput>
        <AddInput label="Starting Date"></AddInput>
        <AddInput label="Salary"></AddInput>
      </div>
    </div>
  );
};

export default HRModal;
