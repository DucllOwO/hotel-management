import React,{useState, useContext, useEffect} from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import Topbar from "../../../../components/Topbar/Topbar";
import ItemTable from "../../Tables/Item/ItemTable";
import "./item.css";

const Item = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await userRequest.get("/items", {
        params: { user: { position: user?.position } }
      });
      console.log(data);
      setItems(data);
      console.log(items)
    };
    fetchItems();
  }, []);
  return (
    <div className="container">
      <div className="itemContainer">
        <ItemTable
        items = {items}></ItemTable>
      </div>
    </div>
  );
};

export default Item;
