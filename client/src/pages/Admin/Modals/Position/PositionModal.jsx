import React from "react";
import FeatureTable from "../../Tables/Function/FeatureTable";
import "./positionmodal.css";
import AddInput from "../../../../components/AddInput/AddInput";
import { Form } from "antd";

const PositionModal = ({
  positionName,
  setPositionName,
  features,
  setFeatures,
  error,
  setError,
}) => {
  return (
    <div className="positionModal">
      <AddInput
        label="Position name"
        value={positionName}
        setInput={setPositionName}
        error={error}
        setError={setError}
      />
      <div style={{ height: "50vh" }}>
        <FeatureTable
          features={features}
          setFeatures={setFeatures}
        ></FeatureTable>
      </div>
    </div>
  );
};

export default PositionModal;
