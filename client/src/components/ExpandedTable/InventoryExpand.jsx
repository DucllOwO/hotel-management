import { Col, Divider, Row, Table } from "antd";
import React from "react";
import dayjs from "dayjs";

const InventoryExpand = ({ inventoryDetail = [] }) => {
  dayjs.tz.setDefault("Asia/Ho_Chi_Minh");
  const columns = [
    {
      key: "1",
      title: "STT",
      dataIndex: "room_type_id",
      width: "5%",
      align: "center",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: "2",
      title: "Tên sản phẩm",
      width: "40%",
      align: "center",
      render: (_, record, index) => {
        return record.item_id.name;
      },
    },
    {
      key: "3",
      title: "Đơn giá",
      align: "center",
      dataIndex: "price",
      render: (text, record) => {
        return <p>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>;
      },
    },
    {
      key: "4",
      title: "Số lượng",
      dataIndex: "amount",
      align: "center",
      render: (text, record) => {
        return <p>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>;
      },
    },
    {
      key: "5",
      title: "Tổng tiền",
      dataIndex: "area",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <p>
            {(record.price * record.amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        );
      },
    },
  ];

  return (
    <div>
      {inventoryDetail.length > 0
        ? inventoryDetail.map((value, index) => (
            <div>
              <Divider orientation="left">
                {String("Thời gian kiểm tra: ") +
                  dayjs(value.inventory_detail[0].record_id.date).format(
                    "HH:mm, DD-MM-YYYY"
                  )}
              </Divider>
              <Table
                rowKey={(row) => row.id}
                dataSource={value.inventory_detail}
                columns={columns}
                pagination={false}
                bordered={true}
              ></Table>
            </div>
          ))
        : null}
    </div>
  );
};

export default InventoryExpand;
