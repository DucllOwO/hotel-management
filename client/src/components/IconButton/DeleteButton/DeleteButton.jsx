import React from "react";
import "../index.css";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteButton = (props) => {
  const { onDeleteButton } = props;
  return (
    <div className="deleteBtn">
      <Button onClick={onDeleteButton}>
        <DeleteOutlined></DeleteOutlined>
      </Button>
    </div>
  );
};

export default DeleteButton;
