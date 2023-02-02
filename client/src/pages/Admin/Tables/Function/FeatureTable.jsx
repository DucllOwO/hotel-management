import React from "react";
import "../index.css";
import { Table } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Column, ColumnGroup } = Table;

const FeatureTable = ({
  features,
  setFeatures,
  readOnly = false,
  loading = false,
}) => {
  return (
    <Table
      dataSource={features}
      scroll={{ y: "28vh" }}
      mobileBreakPoint={800}
      align="center"
      size="small"
      style={{ width: "100%" }}
      rowKey={(record) => record.name}
      pagination={{ defaultPageSize: 6 }}
      bordered={true}
      loading={loading}
    >
      <Column title="Tên" dataIndex="name" key="name" />
      <ColumnGroup title="Hành động" showOnResponse={true} showOnDesktop={true}>
        <Column
          title="Đọc"
          dataIndex="read"
          key="read"
          align="center"
          render={(_, record) => (
            <Checkbox
              checked={record?.read?.isCheck ? true : false}
              disabled={readOnly ? true : record?.read ? false : true}
              onChange={(e) => {
                //console.log(e.target.checked, record);
                setFeatures((prev) =>
                  prev.map((feature) => {
                    if (feature.name === record.name) {
                      return {
                        ...feature,
                        read: {
                          ...feature.read,
                          isCheck: e.target.checked,
                        },
                      };
                    }
                    return feature;
                  })
                );
              }}
            />
          )}
        />
        <Column
          title="Tạo"
          dataIndex="create"
          key="create"
          align="center"
          render={(_, record) => (
            <Checkbox
              checked={record?.create?.isCheck ? true : false}
              disabled={readOnly ? true : record?.create ? false : true}
              onChange={(e) => {
                setFeatures((prev) =>
                  prev.map((feature, index) => {
                    if (feature.name === record.name) {
                      return {
                        ...feature,
                        create: {
                          ...feature.create,
                          isCheck: e.target.checked,
                        },
                      };
                    }
                    return feature;
                  })
                );
              }}
            />
          )}
        />
        <Column
          title="Chỉnh sửa"
          dataIndex="update"
          key="update"
          align="center"
          render={(_, record) => (
            <Checkbox
              checked={record?.update?.isCheck ? true : false}
              disabled={readOnly ? true : record?.update ? false : true}
              onChange={(e) => {
                setFeatures((prev) =>
                  prev.map((feature, index) => {
                    if (feature.name === record.name) {
                      return {
                        ...feature,
                        update: {
                          ...feature.update,
                          isCheck: e.target.checked,
                        },
                      };
                    }
                    return feature;
                  })
                );
              }}
            />
          )}
          showOnResponse={true}
          showOnDesktop={true}
        />
        <Column
          title="Xóa"
          dataIndex="delete"
          key="delete"
          align="center"
          render={(_, record) => (
            <Checkbox
              checked={record?.delete?.isCheck ? true : false}
              disabled={readOnly ? true : record?.delete ? false : true}
              onChange={(e) => {
                setFeatures((prev) =>
                  prev.map((feature, index) => {
                    if (feature.name === record.name) {
                      return {
                        ...feature,
                        delete: {
                          ...feature.delete,
                          isCheck: e.target.checked,
                        },
                      };
                    }
                    return feature;
                  })
                );
              }}
            />
          )}
          showOnResponse={true}
          showOnDesktop={true}
        />
      </ColumnGroup>
    </Table>
  );
};

export default FeatureTable;
