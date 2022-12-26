import { Table, Button } from "antd";
import React, {useState} from "react";
import { fetchDailyReport } from "../../../../api/DashboardAPI";
import { useEffect } from "react";

const data = [];

const DashboardTable = ({data, setData}) => {
  const [type, setType] = useState("income");
  useEffect(()=>{
    switch(type){
      case "income":

        break;
      default:
        break;
    }
  }, [type])
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Ngày lập",
      dataIndex: "established_date",
    },
    {
      key: "3",
      title: "Tổng tiền",
      dataIndex: "total_cost",
    },
    {
      key: "4",
      title: "Phương thức",
      dataIndex: "payment_method",
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
