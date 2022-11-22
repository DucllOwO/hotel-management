import React from "react";
import FeatureTable from "../../Tables/Function/FeatureTable";
import "./positionmodal.css";

const PositionModal = ({ features, name }) => {
  return (
    <div className="positionModal">
      <div>
        <h2>{name}</h2>
      </div>
      <div style={{ height: "50vh" }}>
        <FeatureTable features={features}></FeatureTable>
      </div>
    </div>
  );
};

export default PositionModal;
