import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { useContext } from "react";
import Import from "../Admin/Import/Import";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";

const ImportForm = ({
  data,
  setData,
  amountError,
  totalPrice,
  setTotalPrice,
}) => {
  const { user } = useContext(AppContext);

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    fetchItems(user?.position)
      .then(({ data }) => {
        console.log(data);
        setListItem(createOptionSelect(data));
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy dữ liệu sản phẩm thất bại!!");
      });
  }, [user?.position]);

  return (
    <div className="modal">
      <div style={{ width: "60vw" }}>
        <Input
          size="large"
          disabled={true}
          defaultValue={user?.account.fullname}
        />

        <Import
          items={listItem}
          setListItem={setListItem}
          importList={data}
          setImportList={setData}
          setTotalPrice={setTotalPrice}
        ></Import>
        {amountError ? (
          <div style={{ marginTop: 10 }}>
            <p>
              <ErrorMessage message="Vui lòng kiểm tra lại như sau:" />
            </p>
            <p>
              <ErrorMessage message="-Số lượng của các sản phẩm (tất cả phải lớn hơn 0)" />
            </p>
            <p>
              <ErrorMessage message="-Không được để sản phẩm nào trống (nếu không muốn tạo vui lòng xóa)" />
            </p>
          </div>
        ) : null}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <h2>Tổng tiền: {totalPrice.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );

  function createOptionSelect(arr) {
    return arr.map((item) => {
      return {
        option: {
          label: item.name,
          value: item.id,
        },
        unitPrice: item.sell_price,
      };
    });
  }
};

export default ImportForm;
