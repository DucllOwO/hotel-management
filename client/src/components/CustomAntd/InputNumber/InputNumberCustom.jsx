import { InputNumber } from "antd";
import React from "react";

const InputNumberCustom = ({
  addonAfter = null,
  setFieldValue,
  fieldName = "",
}) => {
  return (
    <InputNumber
      addonAfter={addonAfter}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      style={{ width: "100%" }}
      controls={false}
      onChange={(e) => setFieldValue(fieldName, e)}
    />
  );
};

export default InputNumberCustom;
