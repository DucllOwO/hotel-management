import { notification } from "antd";
import React from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";

const ErrorAlert = (description = "Something wrong!!") => {
  return notification.open({
    message: "Lỗi !!",
    description: description,
    icon: <CloseCircleTwoTone twoToneColor="#ff0000" />,
    duration: 10,
  });
};

export default ErrorAlert;
