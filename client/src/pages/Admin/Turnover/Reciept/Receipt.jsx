import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import Topbar from "../../../../components/Topbar/Topbar";
import ReceiptTable from "../../Tables/Receipt/Receipt";
import "./receipt.css";

const Receipt = () => {
  const [receipt, setReceipt] = useState([]);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReceipt = async () => {
      setIsLoading(true);
      const { data } = await userRequest.get("/receipt", {
        params: { user: { position: user?.position } },
      });
      console.log(data);
      setReceipt(data);
      console.log(receipt);
      setIsLoading(false);
    };
    fetchReceipt();
  }, []);
  return (
    <div className="recieptContainer">
      <ReceiptTable receipt={receipt} isLoading={isLoading}></ReceiptTable>
    </div>
  );
};

export default Receipt;
