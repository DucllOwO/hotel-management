import React, { useState } from "react";
import Topbar from "../../Topbar/Topbar";
import { Input, Button, Table, Select, InputNumber, Modal } from "antd";
import BottomBar from "../BottomBar/BottomBar";
import "./import.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Import = () => {
  const navigate = useNavigate();

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
      title: "Sản phẩm",
      dataIndex: "name",
      align: "center",
      render: (text, record) => {
        return (
          <div className="inputCon">
            <Select
              showSearch
              placeholder="Chọn một sản phẩm"
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
      title: "Số lượng",
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
      title: "Đơn giá",
      dataIndex: "unitPrice",
      align: "center",
    },
    {
      key: "5",
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
    },
    {
      key: "6",
      title: "Thao tác",
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

  const onCancel = () => {
    Modal.confirm({
      title: "Are you sure, you want to discard changes?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        navigate(-1);
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

      <BottomBar>
        <div className="bottomBar">
          <div>
            <Button icon={<PlusOutlined />}>Thêm</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                onCancel();
              }}
              style={{ marginRight: "10px" }}
            >
              Hủy
            </Button>
            <Button type="primary">Xong</Button>
          </div>
        </div>
      </BottomBar>
    </div>
  );
};

export default Import;
