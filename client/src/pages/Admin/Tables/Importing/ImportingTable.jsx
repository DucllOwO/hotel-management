import React, { useState } from "react";
import "../index.css";
import dayjs from "dayjs";
import { Table, Button, Modal, Form, Input, Slider } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ImportForm from "../../../../components/Form/ImportForm";
import { formatDate, formatterInt } from "../../../../Utils/formatter";

const initialValue = [
  {
    id: 1,
    name: "",
    amount: "",
    unitPrice: "",
    total: "",
  },
];

const ImportingTable = ({ importingRecord, setRecord }) => {
  const navigate = useNavigate();
  const [importForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [data, setData] = useState(initialValue);
  const [options, setOptions] = useState([]);
  const [amountFilter, setAmountFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  const amountMark = {
    0: "0",
    200: "200",
  };

  const priceMark = {
    100000: "100,000đ",
    10000000: "10,000,000đ",
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
      filteredValue: [searchedText],
      align: "center",
      onFilter: (value, record) => {
        return (
          String(record.established_date)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.item)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "established_date",
      sorter: (a, b) => a.established_date.localeCompare(b.established_date),
      render: (text, record) => {
        return String(formatDate(record.established_date));
      },
    },
    {
      key: "3",
      title: "Tên sản phẩm",
      dataIndex: "item",
      align: "center",
      sorter: (a, b) => a.item.localeCompare(b.item),
    },
    {
      key: "4",
      title: "Số lượng",
      dataIndex: "amount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
      filteredValue: amountFilter !== null ? [amountFilter] : null,
      filterDropdown: ({ clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                max={200}
                min={0}
                marks={amountMark}
                defaultValue={[0, 20]}
                onChange={(e) => {
                  setAmountFilter(null);
                  setAmountFilter(e);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  setAmountFilter(null);
                  clearFilters({ closeDropdown: true });
                }}
              >
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
      onFilter: (value, record) => {
        if (amountFilter === null) {
          return record.amount;
        } else {
          return record.amount >= value[0] && record.amount <= value[1];
        }
      },
    },
    {
      key: "5",
      title: "Tổng tiền (đ)",
      dataIndex: "total_cost",
      align: "center",
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
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
                  step={100000}
                  width={0.8}
                  range
                  min={100000}
                  max={10000000}
                  marks={priceMark}
                  defaultValue={[100000, 1000000]}
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
    },
  ];
  const onAddButton = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const handleOKModal = async () => {
    console.log(data);
  };

  return (
    <div className="table">
      <>{isModalOpen ? modalJSX() : null}</>
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div></div>
        <div>
          <Input.Search
            onSearch={(value) => {
              setSearchedText(value);
            }}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
            placeholder="Tìm kiếm"
            className="searchInput"
            style={{ width: 264 }}
          />
          <Button
            onClick={onAddButton}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <Table
        showSorterTooltip={false}
        columns={columns}
        dataSource={importingRecord}
        scroll={{ y: "60vh  ", x: "100%" }}
      ></Table>
    </div>
  );
  function modalJSX() {
    return (
      <Modal
        title="Nhập sản phẩm mới"
        open={true}
        okText="Nhập"
        cancelText="Hủy"
        onOk={handleOKModal}
        onCancel={handleCancelModal}
        width="60%"
      >
        <ImportForm
          form={importForm}
          data={data}
          setData={setData}
          width="100%"
        />
      </Modal>
    );
  }
  function handleCancelModal() {
    importForm.resetFields();
    setIsModalOpen(false);
    setData(initialValue);
  }
};

export default ImportingTable;
