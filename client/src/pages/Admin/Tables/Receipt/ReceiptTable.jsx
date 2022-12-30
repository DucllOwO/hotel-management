import React, { useState } from "react";
import "../index.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Slider,
} from "antd";
import dayjs from "dayjs";
import { FilterOutlined } from "@ant-design/icons";
import moment from "moment";
import DetailForm from "../../../../components/Form/DetailForm/DetailForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import { formatDate, formatterInt } from "../../../../Utils/formatter";
import { useEffect } from "react";

const ReceiptTable = ({
  setTime,
  receipt,
  setReceipt,
  type,
  setType,
  positionUser,
  isLoading,
}) => {
  useEffect(() => {
    document.title = "Receipt | Parallel Shine";
  });

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [modal, setModal] = useState(null);

  const [priceFilter, setPriceFilter] = useState(null);
  const [methodFilter, setMethodFilter] = useState("");

  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";

  const price = Math.max(...receipt.map((receipt) => receipt.total_cost));
  const minPrice = Math.min(...receipt.map((receipt) => receipt.total_cost));

  const priceMark = {
    [minPrice]: minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ",
    [price]: price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ",
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: "10%",
    },
    {
      key: "2",
      title: "Ngày lập",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.date)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      sorter: (a, b) => a.established_date.localeCompare(b.established_date),
      dataIndex: "established_date",
      render: (text, record) => {
        return String(formatDate(record.established_date));
      },
    },
    {
      key: "3",
      title: "Tổng tiền (đ)",
      align: "center",
      dataIndex: "total_cost",
      sorter: (a, b) => a.total_cost - b.total_cost,
      filteredValue: priceFilter !== null ? [priceFilter] : null,
      filterDropdown: ({ clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div className="priceSlider">
                <Slider
                  tipFormatter={(value) => {
                    return `${value < 0 ? "-" : ""} ${Math.abs(value)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                  }}
                  width={0.8}
                  step={500000}
                  range
                  min={minPrice}
                  max={price}
                  marks={priceMark}
                  defaultValue={[0, 1000000]}
                  onChange={(e) => {
                    setPriceFilter(null);
                    setPriceFilter(e);
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    setPriceFilter(null);
                    clearFilters({ closeDropdown: true });
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
      onFilter: (value, record) => {
        if (priceFilter === null) {
          return record.total_cost;
        } else {
          return record.total_cost >= value[0] && record.total_cost <= value[1];
        }
      },
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
    },
    {
      key: "4",
      title: "Phương thức",
      align: "center",
      dataIndex: "payment_method",
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
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                  message: "Please enter the method",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
  ];
  return (
    <div className="table">
      {modal !== null && ModalDetail(modal)}

      <div className="buttonContainer">
        <div>
          <Button
            className="dateBtn"
            type={type === "year" ? "primary" : "default"}
            onClick={() => {
              setType("year");
            }}
          >
            Năm
          </Button>
          <Button
            className="dateBtn"
            type={type === "month" ? "primary" : "default"}
            onClick={() => {
              setType("month");
            }}
          >
            Tháng
          </Button>
          <Button
            className="dateBtn"
            type={type === "day" ? "primary" : "default"}
            onClick={() => {
              setType("day");
            }}
          >
            Ngày
          </Button>
        </div>
        <div>
          <div></div>
          <div>
            {type === "day" && (
              <DatePicker
                onChange={onChange}
                defaultValue={dayjs(Date.now())}
                picker="date"
                format={dateFormat}
              ></DatePicker>
            )}
            {type === "month" && (
              <DatePicker
                onChange={onChange}
                defaultValue={dayjs(Date.now())}
                picker="month"
                format={monthFormat}
              ></DatePicker>
            )}
            {type === "year" && (
              <DatePicker
                onChange={onChange}
                picker="year"
                defaultValue={dayjs(Date.now())}
              ></DatePicker>
            )}
          </div>
        </div>
      </div>
      <Table
        loading={isLoading}
        rowKey={(row) => row.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setModal(record);
            },
          };
        }}
        showSorterTooltip={false}
        columns={columns}
        dataSource={receipt}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
  function onChange(date, dateString) {
    setTime(dayjs(date));
  }

  function onCancel() {
    setModal(null);
  }
  function ModalDetail(record) {
    return (
      <Modal
        title={"#" + record.id}
        open={true}
        onCancel={onCancel}
        footer={null}
        width="60%"
      >
        <DetailForm
          receipt={record}
          rowIndex={record.id}
          positionUser={positionUser}
        ></DetailForm>
      </Modal>
    );
  }
};

export default ReceiptTable;
