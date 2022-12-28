import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { useContext } from "react";
import Import from "../Admin/Import/Import";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const ImportForm = ({ form, data, setData }) => {
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
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div style={{ width: "60vw" }}>
          <Form.Item
            label="Nhân viên"
            name="id"
            tooltip="Số CMND của nhân viên đang làm việc"
          >
            <Input
              size="large"
              disabled={true}
              defaultValue={user?.account.fullname}
            />
          </Form.Item>

          <Import
            items={listItem}
            setListItem={setListItem}
            importList={data}
            setImportList={setData}
          ></Import>
        </div>
      </div>
    </Form>
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
