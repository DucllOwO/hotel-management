import React from "react";
import ReceiptTable from "../Tables/Receipt/ReceiptTable";
import "./receipt.css";

const Receipt = () => {
  return (
    <div className="container">
      <div className="customerContainer">
        <div>Receipt</div>
        <ReceiptTable></ReceiptTable>
      </div>
    </div>
  );
};

export default Receipt;
