import React from "react";
import ImportingTable from "../../Tables/Importing/ImportingTable";
import "./importing.css";

const Importing = () => {
  return (
    <div className="container">
      <div className="importingContainer">
        <ImportingTable></ImportingTable>
      </div>
    </div>
  );
};

export default Importing;
