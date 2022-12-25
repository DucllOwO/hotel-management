import { InputNumber } from "antd";
import React, { useState } from "react";

const InputCurrencyCustom = ({
  control = false,
  setFieldValue,
  fieldName = "",
  valueDefault = "",
}) => {
  const [isInput, setIsInput] = useState(false);
  return (
    <InputNumber
      addonAfter={String("đ")}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    />
  );
};

export default InputCurrencyCustom;
