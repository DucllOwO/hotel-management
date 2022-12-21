import React from "react";
import { Button } from "antd";

const TextButton = (props) => {
  const { onHandleTextButton } = props;
  return (
    <div className="textBtn">
      <Button onClick={onHandleTextButton}>{props.title}</Button>
    </div>
  );
};

export default TextButton;
