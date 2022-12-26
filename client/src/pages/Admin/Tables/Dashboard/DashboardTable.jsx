import { Table, Button, Select } from "antd";
import React, { useState } from "react";
import { fetchDailyReport } from "../../../../api/DashboardAPI";
import { useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";

const data = [];

const DashboardTable = ({ data, setData }) => {
  const [type, setType] = useState("income");

  const items = [
    {
      label: "Offline",
      key: "1",
    },
    {
      label: "Online",
      key: "2",
    },
  ];

  useEffect(() => {
    switch (type) {
      case "income":
        break;
      default:
        break;
    }
  }, [type]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "10%",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Ngày lập",
      dataIndex: "established_date",
      align: "center",
      sorter: (a, b) => a.established_date.localeCompare(b.established_date),
    },
    {
      key: "3",
      title: "Tổng tiền (đ)",
      dataIndex: "total_cost",
      align: "center",
      sorter: (a, b) => a.total_cost - b.total_cost,
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
    },
    {
      key: "4",
      title: "Phương thức",
      dataIndex: "payment_method",
      align: "center",
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn hình thức"
                  onChange={(e) => {}}
                />
              </div>
              <Button type="primary" style={{ marginTop: "10px" }}>
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
  ];

  return (
    <div>
      <div className="table">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 350 }}
          rowKey={(row) => row.idNum}
          style={{ width: "100%" }}
        ></Table>
      </div>
    </div>
  );
};

export default DashboardTable;
