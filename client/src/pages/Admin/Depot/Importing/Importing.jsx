import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import ImportingTable from "../../Tables/Importing/ImportingTable";
import { fetchRecord } from "../../../../api/ImportAPI";
import "./importing.css";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const Importing = () => {
  const [record, setRecord] = useState([]);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchRecord(user?.position)
      .then(({ data }) => {
        setRecord(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        ErrorAlert("Lấy dữ liệu nhập hàng thất bại!!");
      })
      .finally(() => setIsLoading(false));
  }, [user?.position]);
  return (
    <div className="importingContainer">
      <ImportingTable
        isLoading={isLoading}
        importingRecord={record}
        setRecord={setRecord}
        positionUser={user.position}
        userID={user.account.id}
      ></ImportingTable>
    </div>
  );
};

export default Importing;
