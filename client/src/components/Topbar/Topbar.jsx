import React from "react";
import { useContext } from "react";
import "../../constant/main.css";
import { AppContext } from "../../context/AppContext";
import "./Topbar.css";

const Topbar = (props) => {
  const { user } = useContext(AppContext);
  return (
    <div className="topbar">
      <div className="information">
        <div className="name">{user.account.fullname}</div>
        <div className="position">{user.position}</div>
      </div>
    </div>
  );
};

export default Topbar;
