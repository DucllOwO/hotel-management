import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, DatePicker, Slider } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PaymentForm from "../../../../components/Form/PaymentForm";
import { createPayment } from "../../../../api/PaymentAPI";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const PaymentTable = ({
  payment,
  setPayment,
  setTime,
  type,
  setType,
  positionUser,
}) => {
  const [form] = Form.useForm();
  const [searchedText, setSearchedText] = useState("");

  const [priceFilter, setPriceFilter] = useState(null);

  const [modal, setModal] = useState(false);

  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";

  const price = Math.max(...payment.map((payment) => payment.total_cost));
  const minPrice = Math.min(...payment.map((payment) => payment.total_cost));

  const priceMark = {
    [minPrice]: minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ",
    [price]: price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ",
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "10%",
      align: "center",
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
      dataIndex: "established_date",
      sorter: (a, b) => a.established_date.localeCompare(b.established_date),
    },
    {
      key: "3",
      title: "Lí do",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.date)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      dataIndex: "name",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "4",
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
  ];

  const onChange = (date, dateString) => {
    setTime(dayjs(date));
  };

  const modalAddPayment = () => (
    <Modal
      title="Thông tin phiếu chi"
      open={true}
      onOk={handleOKModalAdd}
      onCancel={handleCancelModal}
      width="40%"
    >
      <PaymentForm form={form}></PaymentForm>
    </Modal>
  );

  const handleCancelModal = () => {
    setModal(false);
    form.resetFields();
  };

  const handleOKModalAdd = () => {
    form
      .validateFields()
      .then((values) => {
        createPayment(positionUser, values)
          .then(({ data }) => {
            setPayment((prev) => [...prev, data]);
            SuccessAlert("Tạo phiếu chi thành công.");
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Tạo phiếu chi thất bại.");
          })
          .finally(() => {
            setModal(false);
            form.resetFields();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="table">
      <>{modal === true && modalAddPayment()}</>
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
        <div className="rightSearchBar">
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
              defaultValue={dayjs(Date.now())}
              picker="year"
            ></DatePicker>
          )}
          <div>
            <Button
              onClick={() => {
                setModal(true);
              }}
              style={{ marginLeft: "10px" }}
              className="addButton"
              type="primary"
              ghost
              icon={<PlusOutlined />}
            >
              Tạo mới
            </Button>
          </div>
        </div>
      </div>
      <Table
        showSorterTooltip={false}
        columns={columns}
        dataSource={payment}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default PaymentTable;
