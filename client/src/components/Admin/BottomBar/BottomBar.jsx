import React from "react";
import "./bottombar.css";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const BottomBar = (props) => {
  const navigate = useNavigate();

  const onCancel = () => {
    Modal.confirm({
      title: "Are you sure, you want to discard changes?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className="bottomBar">
      <div>
        {props.add && (
          <Button type="primary" icon={<PlusOutlined />}>
            {" "}
            Add{" "}
          </Button>
        )}
      </div>
      <div>
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button type="primary" className="createBtn">
          Create
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
