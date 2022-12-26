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

const ReceiptTable = ({ receipt, setReceipt }) => {
  const [type, setType] = useState("day");

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [modal, setModal] = useState(false);

  const [priceFilter, setPriceFilter] = useState(null);
  const [methodFilter, setMethodFilter] = useState("");

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
    {
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton openModalEdit={() => {}}></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setReceipt((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...receipt];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setReceipt(updateDataSource);
    setEditingRow(null);
  };

  const handleOKModal = () => {
    setModal(false);
  };

  const handleCancelModal = () => {
    setModal(false);
  };

  const ModalDetail = () => {
    return (
      <Modal
        title="INVOICE #123123"
        open={true}
        onOk={handleOKModal}
        onCancel={handleCancelModal}
        width="60%"
      >
        <DetailForm></DetailForm>
      </Modal>
    );
  };

  return (
    <div className="table">
      {modal === true && ModalDetail()}
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div>
          <Button
            onClick={() => {
              setModal(true);
            }}
          >
            Modal
          </Button>
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
                picker="year"
                defaultValue={dayjs(Date.now())}
              ></DatePicker>
            )}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={receipt}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default ReceiptTable;
