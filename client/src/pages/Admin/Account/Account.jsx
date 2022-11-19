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
      setAccounts(data);
    };
    getAccounts();
  }, []);

  return (
    <div className="container">
      <div className="accountContainer">
        <Topbar
          name="Huỳnh Thế Vĩ"
          img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg"
          position="Manager"
        ></Topbar>
        <div>Account</div>
        <AccountTable accounts={accounts}></AccountTable>
      </div>
    </div>
  );
};

export default Account;
