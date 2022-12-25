import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const ErrorMessage = ({ message }) => {
  return (
    <Text type="danger" style={{ fontSize: 16 }}>
      {message}
    </Text>
  );
};

export default ErrorMessage;
