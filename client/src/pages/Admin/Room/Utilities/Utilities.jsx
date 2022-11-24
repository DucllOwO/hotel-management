import React from "react";
import Topbar from "../../../../components/Topbar/Topbar";
import UtilitiesTable from "../../Tables/Utilities/UtilitiesTable";
import "./utilities.css";

const Utilities = () => {
  return (
    <div className="container">
      <div className="utilitiesContainer">
        <UtilitiesTable></UtilitiesTable>
      </div>
    </div>
  );
};

export default Utilities;
