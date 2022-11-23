import React, { useState } from "react";
import AddInput from "../../../../components/AddInput/AddInput";
import "../index.css";
import { Select } from "antd";

const AccountModal = () => {
  const [idNumber, setIDNumber] = useState("");

  const onChange = (value) => {
    setIDNumber(value);
    console.log(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="modal">
      <div className="left">
        <div className="label">Full Name</div>
        <Select
          className="select"
          showSearch
          placeholder="Select a person"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />

        <AddInput label="ID Number" isDisable="true"></AddInput>
      </div>
      <div className="right">
        <AddInput label="Username"></AddInput>
        <AddInput label="Password"></AddInput>
      </div>
    </div>
  );
};

export default AccountModal;
