import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../api/api";
import { AppContext } from "../../../context/AppContext";
import CustomerTable from "../Tables/Customer/CustomerTable";
import "./customer.css";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Customer | Parallel Shine";
    const fetchCustomer = async () => {
      setIsLoading(true);
      const { data } = await userRequest.get("/users", {
        params: { user: { position: user?.position }, type: "customer" },
      });
      console.log(data);
      setCustomer(data);
      console.log(customer);
      setIsLoading(false);
    };
    fetchCustomer();
  }, [user?.position]);

  return (
    <div className="customerContainer">
      <CustomerTable customer={customer} isLoading={isLoading}></CustomerTable>
    </div>
  );
};

export default Customer;
