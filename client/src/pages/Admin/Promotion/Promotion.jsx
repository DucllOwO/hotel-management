import { useContext, useEffect } from "react";
import { useState } from "react";
import { fetchVouchers } from "../../../api/VoucherAPI.js";
import ErrorAlert from "../../../components/Error/Alert/ErrorAlert";
import { AppContext } from "../../../context/AppContext";
import PromotionTable from "../Tables/Promotion/PromotionTable";

const Promotion = () => {
  const [vouchers, setVouchers] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetchVouchers(user?.position)
      .then(({ data }) => {
        setVouchers(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Fetch promotion data error!!");
      });
  }, [user?.position]);

  return (
    <div className="promotionContainer">
      <PromotionTable
        vouchers={vouchers}
        setVouchers={setVouchers}
      ></PromotionTable>
    </div>
  );
};

export default Promotion;
