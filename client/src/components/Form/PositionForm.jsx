import React, { useContext, useEffect } from "react";
import FeatureTable from "../../pages/Admin/Tables/Function/FeatureTable";
import { Form, Input } from "antd";
import { PositionContext } from "../../context/PositionContext";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";
import { userRequest } from "../../api/api";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const PositionForm = ({ form, positionID = null, setOldFeaturesState }) => {
  const { features, setFeatures, isFeaturesError } =
    useContext(PositionContext);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data } = await userRequest.get(
          positionID ? `/positions/${positionID}` : `/features`,
          {
            params: { user: { position: user?.position } },
          }
        );
        console.log(data.data);
        setFeatures(data.data);
        setOldFeaturesState(data.data);
      } catch (error) {
        console.error(error);
        ErrorAlert("Fetch features data error!!");
      }
    };

    fetchFeatures();
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
