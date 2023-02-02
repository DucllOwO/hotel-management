import { Modal } from "antd";
import React from "react";

const WarningModal = (title = "", onOkCallBack, dataForCallBack = null) => {
  return Modal.confirm({
    title: title,
    okText: "Có",
    cancelText: "Không",
    okType: "danger",
    onOk: dataForCallBack ? () => onOkCallBack(dataForCallBack) : onOkCallBack,
  });
};

export default WarningModal;
