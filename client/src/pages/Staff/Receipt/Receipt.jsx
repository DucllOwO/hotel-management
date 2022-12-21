import React from "react";
import ReceiptTable from "../Tables/Receipt/ReceiptTable";
import "./receipt.css";

const Receipt = () => {
  return (
    <div className="customerContainer">
      <ReceiptTable></ReceiptTable>
    </div>
  );
};

export default Receipt;
