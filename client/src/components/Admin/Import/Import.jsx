import React, { useState } from "react";
import Topbar from "../../Topbar/Topbar";
import { Input, Button, Table, Select, InputNumber, Modal } from "antd";
import BottomBar from "../BottomBar/BottomBar";
import "./import.css";

const Import = () => {
  const onChangeSelect = (value) => {
    console.log(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      key: "1",
      title: "No",
      dataIndex: "id",
      align: "center",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (text, record) => {
        return (
          <div className="inputCon">
            <Select
              showSearch
              placeholder="Select a person"
              onChange={onChangeSelect}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "president",
                  label: "President",
                },
                {
                  value: "luxury",
                  label: "Luxury",
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      key: "3",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <InputNumber
              defaultValue={1}
              min={1}
              onChange={() => {}}
            ></InputNumber>
          </>
        );
      },
    },
    {
      key: "4",
      title: "Unit Price",
      dataIndex: "unitPrice",
      align: "center",
    },
    {
      key: "5",
      title: "Total",
      dataIndex: "total",
      align: "center",
    },
    {
      key: "6",
      title: "Actions",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                onDeleteButton(record);
              }}
            >
              delete
            </Button>
          </>
        );
      },
    },
  ];

  const onAddProduct = () => {
    setDataSource((pre) => {
      return [
        ...pre,
        {
          id: pre.length + 1,
          name: "",
          amount: "1",
          unitPrice: "",
          total: "",
        },
      ];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          const temp = pre.filter((data) => data.id !== record.id);
          return temp.map((item, index) => {
            return { ...item, id: index + 1 };
          });
        });
      },
    });
  };

  return (
    <div className="import">
      <Topbar
        name="Huỳnh Thế Vĩ"
        img="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199880924/Boba-Stitch_800x800_SEPS-1000x1000.jpg"
        position="Manager"
      ></Topbar>

      <div className="importContainer">
        <div className="inputCon">
          <div className="label">ID: </div>
          <Input placeholder="ID" disabled="true"></Input>
        </div>

        <div>
          <Table
            size="small"
            columns={columns}
            dataSource={dataSource}
            scroll={{ y: 350 }}
            rowKey={(row) => row.idNum}
            pagination={false}
          ></Table>
        </div>
      </div>

      <BottomBar add="true" onAddProduct={onAddProduct}></BottomBar>
    </div>
  );
};

export default Import;
