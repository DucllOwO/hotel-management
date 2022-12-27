import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import ImportingTable from "../../Tables/Importing/ImportingTable";
import { fetchRecord } from "../../../../api/ImportAPI";
import "./importing.css";

const Importing = () => {
  const [record, setRecord] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    document.title = "Importing | Parallel Shine";
    fetchRecord(user?.position).then(({ data }) => {
      console.log(data);
      setRecord(data);
    });
  }, [record]);
  return (
    <div className="importingContainer">
      <ImportingTable importingRecord={record}></ImportingTable>
    </div>
  );
};

export default Importing;
