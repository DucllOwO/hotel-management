import React, { useState, useEffect, useContext } from "react";
import Topbar from '../../../components/Topbar/Topbar'
import { userRequest } from "../../../api/api";
import "./hr.css"
import { AppContext } from "../../../context/AppContext";
import HRTable from '../Tables/HR/HRTable'

const HR = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AppContext);
  
    useEffect(() => {
      const fetchEmployee = async () => {
        const { data } = await userRequest.get("/users", {
          params: { user: { position: user?.position }, type: "employee" },
        });
        console.log(data.employees);
        setEmployees(data.employees);
      };
      fetchEmployee();
    }, [user?.position]);
  return (
    <div className='container'>
      <div className="hrContainer">
        <HRTable 
        employees = {employees}
        setEmployees = {setEmployees}>
        </HRTable>
      </div>
    </div>
  )
}

export default HR