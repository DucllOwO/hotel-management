import { notification } from "antd";
import React from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";

const SuccessAlert = (description = "") => {
  return notification.open({
    message: "Thành công",
    description: description,
    icon: <CheckCircleTwoTone twoToneColor="#09ff00" />,
    duration: 5,
  });
};

export default SuccessAlert;
