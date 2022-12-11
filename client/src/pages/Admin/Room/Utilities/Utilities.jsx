import React, { useState, useContext, useEffect } from "react";
import Topbar from "../../../../components/Topbar/Topbar";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import UtilitiesTable from "../../Tables/Utilities/UtilitiesTable";
import "./utilities.css";

const Utilities = () => {
  const [utilities, setUtilities] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchUtilities = async () => {
      const { data } = await userRequest.get("/room_features", {
        params: { user: { position: user?.position } },
      });
      console.log(data);
      setUtilities(data.data);
    };
    fetchUtilities();
  }, []);
  return (
    <div className="utilitiesContainer">
      <UtilitiesTable
        utilities={utilities}
        setUtilities={setUtilities}
      ></UtilitiesTable>
    </div>
  );
};

export default Utilities;
