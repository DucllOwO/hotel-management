import React, { useEffect, useState, useContext } from "react";
import { fetchAccount } from "../../../api/AccountAPI";
import ErrorAlert from "../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../context/AppContext";
import AccountTable from "../Tables/Account/AccountTable";
import "./account.css";

const Account = () => {
  const [accounts, setAccounts] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetchAccount(user?.position)
      .then(({ data }) => {
        setAccounts(data);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("Lấy dữ liệu tài khoản thất bại!!");
      });
  }, [user?.position]);

  return (
    <div className="container">
      <div className="accountContainer">
        <AccountTable
          accounts={accounts}
          setAccount={setAccounts}
        ></AccountTable>
      </div>
    </div>
  );
};

export default Account;
