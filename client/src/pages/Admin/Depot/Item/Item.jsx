import React, { useState, useContext, useEffect } from "react";
import { fetchItems } from "../../../../api/ItemAPI";
import { AppContext } from "../../../../context/AppContext";
import Topbar from "../../../../components/Topbar/Topbar";
import ItemTable from "../../Tables/Item/ItemTable";
import "./item.css";

const Item = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    document.title = "Product | Parallel Shine";
    fetchItems(user?.position).then(({ data }) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="itemContainer">
      <ItemTable
        items={items}
        setItems={setItems}
        user={user}
        isLoading={isLoading}
      ></ItemTable>
    </div>
  );
};

export default Item;
