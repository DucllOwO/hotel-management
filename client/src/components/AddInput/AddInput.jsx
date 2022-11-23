import { Input } from "antd";
import React from "react";
import "./addinput.css";

const AddInput = (props) => {
  return (
    <div className="addInput">
      <p className="label">{props.label}</p>
      <Input disabled={props.isDisable ? true : false}></Input>
    </div>
  );
};

export default AddInput;
