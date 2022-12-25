import React, { useState } from "react";
import { Button } from "antd";

const UtilitiesButton = (props) => {
  const [type, setType] = useState("default");

  return (
    <Button
      type={type}
      shape="round"
      onClick={() => {
        if (!props.disabled)
          if (type === "default") {
            setType("primary");
          } else {
            setType("default");
          }
      }}
      icon={props.icon ? <props.icon></props.icon> : ""}
      size={props.size ? props.size : "large"}
      style={{ margin: "5px 0 0 5px" }}
    >
      {props.name}
    </Button>
  );
};

export default UtilitiesButton;
