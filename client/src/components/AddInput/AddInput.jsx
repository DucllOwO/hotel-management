import { Form, Input } from "antd";
import React from "react";
import "./addinput.css";

const AddInput = ({ label, value, setInput, error, setError }) => {
  return (
    <div className="addInput">
      <p className="label">{label}</p>
      <Input
        value={value}
        onChange={(e) => {
          //if (e.target.value !== "") setError(null);
          setInput(e.target.value);
        }}
      />
    </div>
  );
};

export default AddInput;
