import { Form, Input, InputNumber, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const InventoryForm = ({ form }) => {
  const { user } = useContext(AppContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems(user?.position)
      .then(({ data }) => {
        console.log(data);
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
        return <InputNumber value={0} />;
      },
    },
  ];

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Tên phòng" name="room_name">
        <Input disabled={true} />
      </Form.Item>
      <Table columns={columns} dataSource={items}></Table>
    </Form>
  );
};

export default InventoryForm;
