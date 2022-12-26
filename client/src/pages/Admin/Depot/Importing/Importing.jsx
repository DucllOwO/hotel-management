import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import ImportingTable from "../../Tables/Importing/ImportingTable";
import "./importing.css";

const Importing = () => {
  const [record, setRecord] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchRecord = async () => {
      const { data } = await userRequest.get("/importing", {
        params: { user: { position: user?.position } },
      });
      console.log(data);
      setRecord(data);
    };
    fetchRecord();
  }, []);
  return (
    <div className="importingContainer">
      <ImportingTable importingRecord={record}></ImportingTable>
    </div>
  );
};

export default Importing;
