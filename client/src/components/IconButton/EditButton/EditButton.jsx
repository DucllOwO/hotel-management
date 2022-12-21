import React from "react";
import "../index.css";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditButton = (props) => {
  const { openModalEdit } = props;
  return (
    <div className="editBtn">
      <Button onClick={openModalEdit}>
        <EditOutlined></EditOutlined>
      </Button>
    </div>
  );
};

export default EditButton;
