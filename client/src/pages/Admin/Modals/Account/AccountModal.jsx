import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";

const AccountModal = () => {
  return (
    <div className="modal">
      <div className="left">
        <AddInput label="Full Name"></AddInput>
        <AddInput label="Birthday"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Username"></AddInput>
        <AddInput label="Password"></AddInput>
      </div>
    </div>
  );
};

export default AccountModal;
