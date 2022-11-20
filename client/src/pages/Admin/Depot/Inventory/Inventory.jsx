import React from "react";
import InventoryTable from "../../Tables/Inventory/InventoryTable";
import "./inventory.css";

const Inventory = () => {
  return (
    <div className="container">
      <div className="inventoryContainer">
        <div>Inventory</div>
        <InventoryTable></InventoryTable>
      </div>
    </div>
  );
};

export default Inventory;
