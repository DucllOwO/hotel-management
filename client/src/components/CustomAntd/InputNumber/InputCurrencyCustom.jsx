import { InputNumber } from "antd";
import React from "react";

const InputCurrencyCustom = ({ addonAfter, control = false }) => {
  return (
    <InputNumber
      addonAfter={String("đ")}
      controls={control}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    />
  );
};

export default InputCurrencyCustom;
