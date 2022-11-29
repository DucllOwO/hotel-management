import React, { useContext, useEffect } from "react";
import FeatureTable from "../../pages/Admin/Tables/Function/FeatureTable";
import { Form, Input } from "antd";
import { PositionContext } from "../../context/PositionContext";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";
import { fetchPositionByID } from "../../api/PositionAPI";
import { fetchFeatures } from "../../api/FeatureAPI";

const PositionForm = ({ form, positionID = null, setOldFeaturesState }) => {
  const { features, setFeatures, isFeaturesError } =
    useContext(PositionContext);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (positionID)
      fetchPositionByID(user?.position, positionID)
        .then(({ data }) => {
          setOldFeaturesState(data);
          setFeatures(data);
        })
        .catch((err) => {
          console.log(err);
          ErrorAlert("Fetch features of position error!!");
        });
    else
      fetchFeatures(user?.position)
        .then(({ data }) => {
          setFeatures(data);
        })
        .catch((err) => {
          console.log(err);
          ErrorAlert("Fetch features error!!");
        });
  }, [user?.position]);

  return (
    <>
      <Form layout="vertical" form={form} name="positionForm">
        <Form.Item
          label="Position name"
          name="posName"
          rules={[
            {
              required: true,
              message: "Please input position name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      <div style={{ height: "50vh" }}>
        <FeatureTable
          features={features}
          setFeatures={setFeatures}
        ></FeatureTable>
      </div>
      {isFeaturesError ? <ErrorMessage message={isFeaturesError} /> : null}
    </>
  );
};

export default PositionForm;
