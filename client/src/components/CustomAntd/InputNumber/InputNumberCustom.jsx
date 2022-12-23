import { InputNumber } from "antd";
import React from "react";

const InputNumberCustom = () => {
  return (
    <InputNumber
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      style={{ width: "100%" }}
    />
  );
};

export default InputNumberCustom;
