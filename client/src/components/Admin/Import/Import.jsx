import React, { useState } from "react";
import { Button, Table, Select, InputNumber, Form } from "antd";
import CancelButton from "../../IconButton/CancelButton/CancelButton";
import "./import.css";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import WarningModal from "../../WarningModal/WarningModal";

const initialValue = [
  {
    id: 1,
    item_id: "",
    name: "",
    amount: 0,
    unitPrice: 0,
    total: 0,
  },
];

const Import = ({
  items,
  setListItem,
  importList,
  setImportList,
  setTotalPrice,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const columns = [
    {
      key: "1",
      title: "TT",
      dataIndex: "id",
      align: "center",
      width: 50,
      fixed: "left",
    },
    {
      key: "2",
      title: "Sản phẩm",
      dataIndex: "name",
      align: "center",
      fixed: "left",
      render: (text, record) => {
        return (
          <Select
            width={300}
            showSearch
            value={text ? text : null}
            placeholder="Chọn một sản phẩm"
            onChange={(value, option) => {
              onItemChange(value, record.id, option);
            }}
            options={
              items.length > 0
                ? items.map((item) => {
                    return item?.option;
                  })
                : []
            }
          />
        );
      },
    },
    {
      key: "3",
      title: "Số lượng",
      dataIndex: "amount",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <InputNumber
              defaultValue={0}
              value={text}
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
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div>
              <CancelButton
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
      const importListTemp = prev.map((importTemp, index) => {
        if (importTemp.id === importID) {
          return {
            ...importTemp,
            id: index + 1,
            amount: e,
            total: e * importTemp.unitPrice,
          };
        }
        return { ...importTemp, id: index + 1 };
      });

      setTotalPrice(
        importListTemp.reduce((total, value) => total + value.total, 0)
      );

      return importListTemp;
    });
  };

  function onDeleteButton(record) {
    const itemDeleted = selectedOptions.find(
      (option) => option.option.label === record.name
    );
    if (itemDeleted) setListItem((prev) => [...prev, itemDeleted]);

    setImportList((prev) => {
      const filter = prev.filter(
        (importTemp) => importTemp.name !== record.name
      );
      const idSorted = filter.map((importTemp, index) => {
        return { ...importTemp, id: index + 1 };
      });
      if (idSorted.length >= 1) {
        setTotalPrice(
          idSorted.reduce((total, value) => total + value.total, 0)
        );
        return idSorted;
      } else return initialValue;
    });
  }

  const onItemChange = (itemID, importID, optionSelect) => {
    let option = items.find((item) => item.option.value === itemID);
    let importToCheck = importList.find(
      (importTemp) => importTemp.id === importID
    );

    if (importToCheck.name.length === 0) {
      setSelectedOptions((prev) => [...prev, option]);
      setListItem((prev) => {
        return prev.filter((value) => {
          if (value.option.value !== itemID) {
            return true;
          }
          return false;
        });
      });
    } else {
      let prevOption = selectedOptions.find(
        (value) => value.option.label === importToCheck.name
      );
      setSelectedOptions((prev) =>
        prev.map((value) => {
          if (value.option.label === prevOption.option.label) return option;
          return value;
        })
      );
      setListItem((prev) => {
        return prev.map((value) => {
          if (value.option.value === itemID) {
            return prevOption;
          }
          return value;
        });
      });
    }

    setImportList((prev) => {
      return prev.map((importTemp) => {
        if (importTemp.id === importID) {
          return {
            ...importTemp,
            item_id: option.option.value,
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
          item_id: "",
          name: "",
          amount: 0,
          unitPrice: 0,
          total: 0,
        },
      ];
    });
  };

  return (
    <div className="import">
      <div className="importContainer">
        <div>
          <Table
            size="small"
            columns={columns}
            dataSource={importList || initialValue}
            scroll={{ y: "30vh" }}
            rowKey={(row) => row.id}
            pagination={false}
          ></Table>
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
