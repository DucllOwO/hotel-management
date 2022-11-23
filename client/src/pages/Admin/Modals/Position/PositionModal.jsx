import React from "react";
import FeatureTable from "../../Tables/Function/FeatureTable";
import "./positionmodal.css";
import AddInput from "../../../../components/AddInput/AddInput";
import { useState, useContext } from "react";
import { PositionContext } from "../../../../context/PositionContext";
import { Form } from "antd";

const PositionModal = ({
  positionName,
  setPositionName,
  features,
  setFeatures,
}) => {
  return (
    <div className="positionModal">
      <Form autoComplete="off">
        <Form.Item
          label="positionName"
          name="positionName"
          rules={[
            {
              required: true,
              message: "Please input position name!",
            },
          ]}
        >
          <AddInput
            label="Position name"
            positionName={positionName}
            setPositionName={setPositionName}
          />
        </Form.Item>
      </Form>
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
