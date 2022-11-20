import React from "react";
import CustomerTable from "../Tables/Customer/CustomerTable";
import "./customer.css";

const Customer = () => {
  return (
    <div className="container">
      <div className="customerContainer">
        <div>Customer</div>
        <CustomerTable></CustomerTable>
      </div>
    </div>
  );
};

export default Customer;
