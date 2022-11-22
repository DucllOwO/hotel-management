import React from "react";
import ImportingTable from "../../Tables/Importing/ImportingTable";
import InventoryTable from "../../Tables/Inventory/InventoryTable";
import "./inventory.css";

const Inventory = () => {
  return (
    <div className="container">
      <div className="inventoryContainer">
        <InventoryTable></InventoryTable>
      </div>
    </div>
  );
};

export default Inventory;
