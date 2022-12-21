import React from "react";
import "../index.css";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const SaveButton = (props) => {
  const { onSaveButton } = props;
  return (
    <div className="editButton">
      <Button onClick={onSaveButton}>
        <SaveOutlined></SaveOutlined>
      </Button>
    </div>
  );
};

export default SaveButton;
