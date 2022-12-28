import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import ImportingTable from "../../Tables/Importing/ImportingTable";
import { fetchRecord } from "../../../../api/ImportAPI";
import "./importing.css";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const Importing = () => {
  const [record, setRecord] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetchRecord(user?.position)
      .then(({ data }) => {
        console.log(data);
        setRecord(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy dữ liệu nhập hàng thất bại!!");
      });
  }, [user?.position]);
  return (
    <div className="importingContainer">
      <ImportingTable importingRecord={record}></ImportingTable>
    </div>
  );
};

export default Importing;
