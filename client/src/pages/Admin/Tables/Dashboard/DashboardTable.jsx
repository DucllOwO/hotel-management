import { Table, Button, Select } from "antd";
import React, { useState } from "react";
import { fetchDailyReport } from "../../../../api/DashboardAPI";
import { useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";

const data = [];

const DashboardTable = ({ data, setData, revenue, isLoading }) => {
  const [type, setType] = useState("income");

  const [methodFilter, setMethodFilter] = useState("");

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
      filteredValue: methodFilter !== "" ? [methodFilter] : null,
      filterDropdown: ({ confirm, clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  style={{ width: 150 }}
                  defaultValue={"Offline"}
                  placeholder="Chọn phương thức"
                  options={[
                    {
                      value: "Offline",
                      label: "Offline",
                    },
                    {
                      value: "Online",
                      label: "Online",
                    },
                  ]}
                  onChange={(e) => {
                    setMethodFilter(e);
                    confirm();
                  }}
                />
                {/* <Select
                  style={{ width: 200 }}
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn phương thức"
                  onChange={(e) => {
                    console.log(e);
                    setMethodFilter(e);
                    confirm();
                  }}
                /> */}
              </div>
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setMethodFilter("");
                  clearFilters({ closeDropdown: true });
                }}
              >
                Reset
              </Button>
            </div>
          </>
        );
      },
      onFilter: (value, record) => {
        console.log(value);
        if (methodFilter === "") {
          return record.payment_method;
        } else {
          return record.payment_method === value;
        }
        // record.roomType === value;
        // console.log(value);
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
  ];

  const columnsNoMethod = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
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
  ];

  return (
    <div className="table">
      <Table
        loading={isLoading}
        columns={revenue === "income" ? columns : columnsNoMethod}
        dataSource={data}
        scroll={{ y: "30vh" }}
        rowKey={(row) => row.idNum}
      ></Table>
    </div>
  );
};

export default DashboardTable;
