import React from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import FeatureTable from "../../Tables/Function/FeatureTable";
import "./positionmodal.css";

const PositionModal = ({ features }) => {
  return (
    <div className="positionModal">
      <div>
        <AddInput label="Name"></AddInput>
      </div>
      <div>
        <FeatureTable features={features}></FeatureTable>
      </div>
    </div>
  );
};

export default PositionModal;
