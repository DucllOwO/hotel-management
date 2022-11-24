import { Input } from "antd";
import ErrorList from "antd/lib/form/ErrorList";
import React from "react";
import "./addinput.css";

const AddInput = ({ label, value, setInput, error, setError }) => {
  //const [input, setInput] = useState("");
  return (
    <div className="addInput">
      <p className="label">{label}</p>
      <Input
        value={value}
        onChange={(e) => {
          if (e.target.value !== "") setError(null);
          setInput(e.target.value);
        }}
      />
      {error != null || error !== "" ? (
        <span style={{ color: "red" }}>{error}</span>
      ) : null}
    </div>
  );
};

export default AddInput;
