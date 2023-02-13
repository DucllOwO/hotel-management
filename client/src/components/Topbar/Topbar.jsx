import React from "react";
import { useContext } from "react";
import "../../constant/main.css";
import { AppContext } from "../../context/AppContext";
import "./Topbar.css";
import { Button } from "antd/es/radio";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const Topbar = (props) => {
  const { user } = useContext(AppContext);
  const onMenuButtonClick = () => {
    props.setCollapsed(!props.collapsed);
    // if(collapsed === false)
    // {
      
    // }
  }

  return (
    <div className="topbar">
      <div className="menuButton">
        <Button type="primary" onClick={onMenuButtonClick} style={{ marginBottom: 16 }}>
          {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>  
      </div>  
      <div className="information">
        <div className="name">{user.account.fullname}</div>
        <div className="position">{user.position}</div>
      </div>
    </div>
  );
};

export default Topbar;
