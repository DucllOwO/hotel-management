import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import HRTable from "../Tables/HR/HRTable";
import { fetchEmployee } from "../../../api/EmployeeAPI";
import ErrorAlert from "../../../components/Error/Alert/ErrorAlert";

const HR = () => {
  const [employees, setEmployees] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log("use Effect running");
    fetchEmployee(user?.position)
      .then(({ data }) => {
        console.log(data);
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Fetch employee error!!");
      });
  }, [user?.position]);
  return (
    <div className="container">
      <div className="hrContainer">
        <HRTable employees={employees} setEmployees={setEmployees}></HRTable>
      </div>
    </div>
  );
};

export default HR;
