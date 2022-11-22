import { Input } from "antd";
import React from "react";
import "./addinput.css";

const AddInput = (props) => {
  return (
    <div className="addInput">
      <p className="label">{props.label}</p>
      <Input
        value={props.value}
        onChange={(e) => props.setName(e.target.value)}
      />
    </div>
  );
};

export default AddInput;
