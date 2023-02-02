import React from "react";
import "./bottombar.css";

const BottomBar = (props) => {
  return <div className="bottomBar">{props.children}</div>;
};

export default BottomBar;
