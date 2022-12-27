import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker, Slider } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import PaymentForm from "../../../../components/Form/PaymentForm";

const PaymentTable = ({ payment, setPayment }) => {
  const [type, setType] = useState("day");

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [priceFilter, setPriceFilter] = useState(null);

  const [modal, setModal] = useState(false);

  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";

  const priceMark = {
    0: "0đ",
    50000000: "50,000,000đ",
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
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter the purpose",
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
                  min={0}
                  max={50000000}
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
    //console.log(date, dateString);
  };

  const onAddButton = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newData = {
      idNum: "" + parseInt(payment.length + 1),
      date: "Date " + randomNumber,
      amount: "20",
      price: randomNumber + " price",
    };

    setPayment((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setPayment((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...payment];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setPayment(updateDataSource);
    setEditingRow(null);
  };

  const modalAddPayment = () => (
    <Modal
      title="Thông tin phiếu chi"
      open={true}
      onOk={handleOKModalAdd}
      onCancel={handleCancelModal}
      width="40%"
    >
      <PaymentForm></PaymentForm>
    </Modal>
  );

  const handleCancelModal = () => {
    setModal(false);
    form.resetFields();
  };

  const handleOKModalAdd = () => {
    setModal(false);
  };

  return (
    <div className="table">
      <>{modal === true && modalAddPayment()}</>
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
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
              defaultValue={moment()}
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
