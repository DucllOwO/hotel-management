import { Result, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const _404ErrorBoundary = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/admin")}>
          Go Home
        </Button>
      }
    />
  );
};

export default _404ErrorBoundary;
