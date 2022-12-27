import React, { useState } from "react";
import { Button, Table, Select, InputNumber, Form } from "antd";
import CancelButton from "../../IconButton/CancelButton/CancelButton";
import "./import.css";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import WarningModal from "../../WarningModal/WarningModal";

const Import = ({ items, setListItem, importList, setImportList }) => {
  // const [price, setPrice] = useState(0);

  // const [quantity, setQuantity] = useState(0);

  // const [totalCost, setTotalCost] = useState(0);

  // const calcTotalCost = () => {
  //   setTotalCost(quantity * price);
  // };
  // useEffect(() => {
  //   setListItem(items);

  //   calcTotalCost();
  // }, [quantity, price]);
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
            onChange={(value) => {
              onItemChange(value, record.id);
            }}
            options={items.map((item) => {
              return item.option;
            })}
          />
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
              onChange={(e) => {
                onAmountChange(e, record.id);
              }}
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
      render: (text, record) => {
        const getUnitPrice = () => {
          let temp;
          importList.forEach((element) => {
            if (element.id === record.id) temp = element.unitPrice;
          });
          console.log(temp);
          return temp;
        };
        return (
          <>
            <InputNumber
              defaultValue={0}
              value={getUnitPrice().toLocaleString()}
              addonAfter={"đ"}
              min={0}
              controls={false}
              disabled={true}
            ></InputNumber>
          </>
        );
      },
    },
    {
      key: "5",
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
      render: (_, record) => {
        const getTotal = () => {
          let temp;
          importList.forEach((element) => {
            if (element.id === record.id) temp = element.total;
          });
          console.log(temp);
          return temp;
        };
        return (
          <>
            <InputNumber
              defaultValue={0}
              value={getTotal().toLocaleString()}
              min={0}
              addonAfter={"đ"}
              disabled={true}
            ></InputNumber>
          </>
        );
      },
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
                onCancelButton={() => onDeleteButton(record)}
              ></CancelButton>
            </div>
          </>
        );
      },
    },
  ];

  const onAmountChange = (e, importID) => {
    setImportList((prev) => {
      return prev.map((importTemp) => {
        if (importTemp.id === importID) {
          return { ...importTemp, amount: e, total: e * importTemp.unitPrice };
        }
        return importTemp;
      });
    });
  };

  function onDeleteButton(record) {}

  const onItemChange = (itemID, importID) => {
    // setListItem((prev) => {
    //   return prev.filter((value) => value.option.value !== itemID);
    // });

    let option = items.find((item) => item.option.value === itemID);
    console.log(option);
    setImportList((prev) => {
      return prev.map((importTemp) => {
        if (importTemp.id === importID) {
          return {
            ...importTemp,
            name: option.option.label,
            unitPrice: option.unitPrice,
          };
        }
        return importTemp;
      });
    });
  };
  const onAddProduct = () => {
    setImportList((pre) => {
      return [
        ...pre,
        {
          id: pre.length + 1,
          name: "",
          amount: "1",
          unitPrice: "0",
          total: "0",
        },
      ];
    });
  };

  return (
    <div className="import">
      <div className="importContainer">
        <div>
          <Form.Item name="duc">
            <Table
              size="small"
              columns={columns}
              dataSource={importList}
              scroll={{ y: 350 }}
              rowKey={(row) => row.id}
              pagination={false}
            ></Table>
          </Form.Item>
        </div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={onAddProduct}
            style={{ marginTop: 10 }}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Import;
