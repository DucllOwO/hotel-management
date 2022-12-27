import React, { useState } from "react";
import Topbar from "../../Topbar/Topbar";
import { Input, Button, Table, Select, InputNumber, Modal } from "antd";
import BottomBar from "../BottomBar/BottomBar";
import CancelButton from "../../IconButton/CancelButton/CancelButton";
import "./import.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Import = ({items}) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([{
    id: 1,
    name: "",
    amount: "",
    unitPrice: "",
    total: "",
  },]);
  const [listItem, setListItem] = useState({});
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  // const onChangeSelect = (value) => {
  //   console.log(value);
  // };

  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };
  const calcTotalCost = () => {
    setTotalCost(quantity * price);
    // console.log(totalCost)
  }
  useEffect(()=> {
    setListItem(items); 
    calcTotalCost();
  }, [quantity, price])
  const columns = [
    {
      key: "1",
      title: "STT",
      dataIndex: "id",
      align: "center",
      width: 50,
    },
    {
      key: "2",
      title: "Sản phẩm",
      dataIndex: "name",
      align: "center",
      render: (text, record) => {
        return (
          <div>
            <Select
              width={200}
              showSearch
              placeholder="Chọn một sản phẩm"
              // onChange={onChangeSelect}
              // onSearch={onSearch}
              // filterOption={(input, option) =>
              //   (option?.label ?? "")
              //     .toLowerCase()
              //     .includes(input.toLowerCase())
              // }
              onChange={(value) => {onItemChange(value)}}
              options={items}
            />
          </div>
        );
      },
    },
    {
      key: "3",
      title: "Số lượng",
      dataIndex: "quantity",
      width: 100,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <InputNumber
              defaultValue={0}
              min={0}
              onChange={(value) => setQuantity(value)}
            ></InputNumber>
          </>
        );
      },
    },
    {
      key: "4",
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <InputNumber
              defaultValue={0}
              addonAfter={"đ"}
              min={0}
              onChange={(value) => setPrice(value)}
            ></InputNumber>
          </>
        )
      }
    },
    {
      key: "5",
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <InputNumber
              placeholder={totalCost}
              addonAfter={"đ"}
              disabled={true}
            ></InputNumber>
          </>
        )
      }
    },
    {
      key: "6",
      title: "Thao tác",
      dataIndex: "action",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div>
              <CancelButton
                title="Xoá"
                onCancelButton={onDeleteButton}
              ></CancelButton>
            </div>
          </>
        )
      }
    },

  ];
  const onItemChange = (item) => {
    setListItem((prev)=>{
      prev.filter((value) => value === item)
    })
  }
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

  // const onCancel = () => {
  //   Modal.confirm({
  //     title: "Are you sure, you want to discard changes?",
  //     okText: "Yes",
  //     okType: "danger",
  //     onOk: () => {
  //       navigate(-1);
  //     },
  //   });
  // };

  return (
    <div className="import">
      <div className="importContainer">
        <div>
          <Table
            size="small"
            columns={columns}
            dataSource={dataSource}
            scroll={{ y: 350 }}
            rowKey={(row) => row.id}
            pagination={false}
          ></Table>
        </div>
        <div>
            <Button icon={<PlusOutlined />} onClick={onAddProduct}>Thêm</Button>
        </div>
      </div>
    </div>
  );
};

export default Import;
