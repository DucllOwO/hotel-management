import React from "react";
import "../index.css";
import { Button, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const CheckButton = (props) => {
  const { onCheckButton } = props;
  return (
    <div>
      <Tooltip title={props.title}>
        <Button onClick={onCheckButton}>
          <CheckOutlined></CheckOutlined>
        </Button>
      </Tooltip>
    </div>
  );
};

export default CheckButton;
