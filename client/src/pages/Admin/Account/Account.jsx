import { Alert } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { userRequest } from "../../../api/api";
import Topbar from "../../../components/Topbar/Topbar";
import { AppContext } from "../../../context/AppContext";
import AccountTable from "../Tables/Account/AccountTable";
import "./account.css";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const getAccounts = async () => {
      const { data } = await userRequest.get("/accounts", {
        params: { user: { position: user?.position } },
      });
      setAccounts(data.data);
    };
    getAccounts();
  }, [user?.position]);

  return (
    <div className="container">
      <div className="accountContainer">
        <div>Account</div>
        <AccountTable accounts={accounts}></AccountTable>
      </div>
    </div>
  );
};

export default Account;
