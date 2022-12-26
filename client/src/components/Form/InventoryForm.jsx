import { Form, Input, InputNumber, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { AppContext } from "../../context/AppContext";
import { ItemContext } from "../../context/ItemContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const InventoryForm = ({ form, record, setRecord }) => {
  const { user } = useContext(AppContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems(user?.position)
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy thông tin sản phẩm thất bại!");
      });
  }, [user?.position]);

  const columns = [
    {
      key: "1",
      title: "Sản phẩm",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Số lượng",
      dataIndex: "amount",
      render: (text, record) => {
        return <InputNumber 
          min={0} 
          defaultValue={0}
          onChange={(value) => {setRecord((prev) => {
            console.log(prev)
            prev.map((item) => {
              if(item.id === record.id)
              {
                item.amount = value;
              }  
            })
            return [
              ...prev,
              {
                id: record.id,
                amount: value,
              }
            ]
          })}}
        />;
      },
    },
  ];

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Tên phòng" name="room_name">
        <Input disabled={true} />
      </Form.Item>
      <Table name="table" columns={columns} dataSource={items} rowKey={(record) => record.id}></Table>
    </Form>
  );
};

export default InventoryForm;
