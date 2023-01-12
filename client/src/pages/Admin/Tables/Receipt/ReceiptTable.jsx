import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, DatePicker, Select, Slider, Tag } from "antd";
import dayjs from "dayjs";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert"
import { AppContext } from "../../../../context/AppContext";
import { FilterOutlined } from "@ant-design/icons";
import DetailForm from "../../../../components/Form/DetailForm/DetailForm";
import { formatDate } from "../../../../Utils/formatter";
import { useEffect, useContext } from "react";
import CheckButton from "../../../../components/IconButton/CheckButton/CheckButton";
import { updateReceipt } from "../../../../api/receiptAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const ReceiptTable = ({
  setTime,
  receipt,
  setReceipt,
  dateType,
  setDateType,
  positionUser,
  isLoading,
}) => {
  useEffect(() => {
    document.title = "Receipt | Parallel Shine";
  });

  const [searchedText, setSearchedText] = useState("");

  const [modal, setModal] = useState(null);

  const [priceFilter, setPriceFilter] = useState(null);
  const [methodFilter, setMethodFilter] = useState("");
  const { user } = useContext(AppContext);

  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";

  const price = Math.max(
    receipt ? receipt.map((receipt) => receipt.total_cost) : []
  );
  const minPrice = Math.min(
    receipt ? receipt.map((receipt) => receipt.total_cost) : []
  );

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
        return <p>{text}</p>;
      },
    },
    {
      key: "5",
      title: "Tình trạng",
      align: "center",
      dataIndex: "status",
      render: (text, value) => {
        switch (value.status) {
          case "0":
            return <Tag color="red">Chưa thanh toán</Tag>;
          case "1":
            return <Tag color="green">Đã thanh toán</Tag>;
          default:
            return <Tag>Lỗi trạng thái</Tag>;
        }
      },
    },
    {
      key: "6",
      title: "Thao tác",
      align: "center",
      render: (text, value) => {
        if (value.status === "0") {
          return (
            <>
              <CheckButton onCheckButton={() => onCheckButton(value)}/>
            </>
          );
        }
        return null;
      },
    },
  ];
  
  const onCheckButton = (receipt) => {
    Modal.confirm({
      title: "Xác nhận thanh toán?",
      okText: "Đúng",
      okType: "danger",
      onOk: () => {
        updateReceipt(user?.position, receipt.id, {status: "1"})
        .then(() => {
          SuccessAlert("Thanh toán thành công");
        })
        .catch((error) =>{
          ErrorAlert("Đã xảy ra lỗi khi thanh toán");
          throw error;
        })
      }
    });
  }
  return (
    <div className="table">
      {modal !== null && ModalDetail(modal)}
      <div className="buttonContainer">
        <div>
          <Button
            className="dateBtn"
            type={dateType === "year" ? "primary" : "default"}
            onClick={() => {
              setDateType("year");
              setTime(dayjs(Date.now()));
            }}
          >
            Năm
          </Button>
          <Button
            className="dateBtn"
            type={dateType === "month" ? "primary" : "default"}
            onClick={() => {
              setDateType("month");
              setTime(dayjs(Date.now()));
            }}
          >
            Tháng
          </Button>
          <Button
            className="dateBtn"
            type={dateType === "day" ? "primary" : "default"}
            onClick={() => {
              setDateType("day");
              setTime(dayjs(Date.now()));
            }}
          >
            Ngày
          </Button>
        </div>
        <div>
          <div></div>
          <div>
            {dateType === "day" && (
              <DatePicker
                onChange={onChange}
                defaultValue={dayjs(Date.now())}
                picker="date"
                format={dateFormat}
              ></DatePicker>
            )}
            {dateType === "month" && (
              <DatePicker
                onChange={onChange}
                defaultValue={dayjs(Date.now())}
                picker="month"
                format={monthFormat}
              ></DatePicker>
            )}
            {dateType === "year" && (
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
