import React from "react";
import "../index.css";
import { Table } from "antd";
import "antd/dist/antd.less";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Column, ColumnGroup } = Table;

const FeatureTable = ({ features }) => {
  console.log(features);
  return (
    <div className="table">
      <Table
        dataSource={features}
        scroll={{ y: 350 }}
        mobileBreakPoint={800}
        align="center"
        size="middle"
        style={{ width: "100%" }}
        rowKey={(record) => record.id}
        pagination={false}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <ColumnGroup title="Action" showOnResponse={true} showOnDesktop={true}>
          <Column
            title="Read"
            dataIndex="read"
            key="read"
            align="center"
            render={(_, record) => <Checkbox></Checkbox>}
            showOnResponse={true}
            showOnDesktop={true}
          />
          <Column
            title="Create"
            dataIndex="create"
            key="create"
            align="center"
            render={(_, record) => <Checkbox></Checkbox>}
            showOnResponse={true}
            showOnDesktop={true}
          />
          <Column
            title="Update"
            dataIndex="update"
            key="update"
            align="center"
            render={(_, record) => <Checkbox></Checkbox>}
            showOnResponse={true}
            showOnDesktop={true}
          />
          <Column
            title="Delete"
            dataIndex="delete"
            key="delete"
            align="center"
            render={(_, record) => <Checkbox></Checkbox>}
            showOnResponse={true}
            showOnDesktop={true}
          />
        </ColumnGroup>
      </Table>
    </div>
  );
};

export default FeatureTable;
