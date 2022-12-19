import React, { useContext, useEffect } from "react";
import FeatureTable from "../../pages/Admin/Tables/Function/FeatureTable";
import { Form, Input } from "antd";
import { PositionContext } from "../../context/PositionContext";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";
import { fetchPositionByID } from "../../api/PositionAPI";
import { fetchFeatures } from "../../api/FeatureAPI";

const PositionForm = ({
  form,
  positionID = null,
  setOldFeaturesState,
  readOnly = false,
}) => {
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
          ErrorAlert("Lấy danh sách chức năng của chức vụ không thành công!!");
        });
    else
      fetchFeatures(user?.position)
        .then(({ data }) => {
          setFeatures(data);
        })
        .catch((err) => {
          console.log(err);
          ErrorAlert("Lấy danh sách chức năng không thành công!!");
        });
  }, [user?.position]);

  return (
    <>
      {!readOnly ? (
        <Form layout="vertical" form={form} name="positionForm">
          <Form.Item
            label="Tên chức vụ"
            name="posName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên chức vụ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      ) : null}

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
