import React from "react";
import Topbar from "../../../components/Topbar/Topbar";
import AccountTable from "../Tables/Account/AccountTable";
import "./account.css";

const Account = () => {
  return (
    <div className="container">
      <div className="accountContainer">
        <AccountTable></AccountTable>
      </div>
    </div>
  );
};

export default Account;
