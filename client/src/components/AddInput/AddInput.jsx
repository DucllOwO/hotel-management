import { Input } from "antd";
import ErrorList from "antd/lib/form/ErrorList";
import React from "react";
import "./addinput.css";

const AddInput = ({ label, positionName, setPositionName, error }) => {
  //const [input, setInput] = useState("");
  return (
    <div className="addInput">
      <p className="label">{label}</p>
      <Input
        value={positionName}
        onChange={(e) => setPositionName(e.target.value)}
      />
      {/* <span style={{ color }}>{error}</span>
      <ErrorList */}
    </div>
  );
};

export default AddInput;
