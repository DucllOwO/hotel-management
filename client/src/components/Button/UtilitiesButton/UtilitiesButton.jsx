import React, { useState } from "react";
import { Button } from "antd";

const UtilitiesButton = (props) => {
  const [size, setSize] = useState("large");

  const [type, setType] = useState("default");

  return (
    <Button
      type={type}
      shape="round"
      onClick={() => {
        if (type === "default") {
          setType("primary");
        } else {
          setType("default");
        }
      }}
      icon={props.icon ? <props.icon></props.icon> : ""}
      size={size}
    >
      {props.name}
    </Button>
  );
};

export default UtilitiesButton;
