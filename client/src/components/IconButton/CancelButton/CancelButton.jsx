import React from "react";
import "../index.css";
import { Button, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const CancelButton = (props) => {
  const { onCancelButton } = props;
  return (
    <div className="cancelBtn">
      <Tooltip title={props.title}>
        <Button onClick={onCancelButton}>
          <CloseOutlined style={{ color: "#ff0000" }}></CloseOutlined>
        </Button>
      </Tooltip>
    </div>
  );
};

export default CancelButton;
