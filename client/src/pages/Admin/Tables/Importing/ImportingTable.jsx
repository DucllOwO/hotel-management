import React, { useState } from "react";
import "../index.css";
import dayjs from "dayjs";
import { Table, Button, Modal, Form, Input, Slider } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import ImportForm from "../../../../components/Form/ImportForm";
import { formatDate } from "../../../../Utils/formatter";
import { createRecord, fetchRecordDetail } from "../../../../api/ImportAPI";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import ImportingExpand from "../../../../components/ExpandedTable/ImportingExpand";

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

const ImportingTable = ({
  importingRecord,
  setRecord,
  positionUser,
  userID,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState(initialValue);

  const [amountError, setAmountError] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);

  const [priceFilter, setPriceFilter] = useState(null);
  const [amountFilter, setAmountFilter] = useState(null);
  const [searchedText, setSearchedText] = useState("");

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
      title: "Người lập",
      dataIndex: "employee_id.name",
      width: "30%",
      align: "center",
      render: (_, record) => {
        // record.emloyee_id
        console.log(record);
        return String(record?.employee_id?.fullname);
      },
    },
    {
      key: "3",
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
    // check amount, empty data
    console.log(data);
    const isDataValid = data.every(
      (value) => value.amount > 0 && value.name !== ""
    );

    if (isDataValid) {
      setAmountError(false);
      createRecord(
        positionUser,
        { employee_id: userID, total_cost: totalPrice },
        createPurchaseDetailArr(data)
      )
        .then(({ data }) => {
          setRecord((prev) => [...prev, data]);
          SuccessAlert("Lập phiếu nhập sản phẩm thành công.");
          resetValue();
        })
        .catch((err) => {
          console.log(err);
          ErrorAlert("Lập phiếu nhập sản phẩm thất bại!!");
        });
    } else setAmountError(true);
  };

  function createPurchaseDetailArr(importData) {
    return importData.map((value) => ({
      item_id: value.item_id,
      amount: value.amount,
      unit_price: value.unitPrice,
    }));
  }

  return (
    <div className="table">
      <>{isModalOpen ? modalJSX() : null}</>
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
        loading={isLoading}
        rowKey={(row) => row.id}
        showSorterTooltip={false}
        columns={columns}
        dataSource={importingRecord}
        scroll={{ y: "60vh  ", x: "100%" }}
        expandable={{
          expandedRowRender: (record) => {
            return <ImportingExpand dataSource={record.detail} />;
          },
          onExpand: (expanded, record) => {
            fetchRecordDetail(positionUser, record.id)
              .then(({ data }) => {
                setRecord((prev) => {
                  return prev.map((importTemp) => {
                    if (record.id === importTemp.id) {
                      return { ...importTemp, detail: data.detail };
                    }
                    return importTemp;
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                ErrorAlert("Lấy dữ liệu tiện ích của loại phòng thất bại!!");
              });
          },
        }}
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
          data={data}
          setData={setData}
          width="100%"
          amountError={amountError}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </Modal>
    );
  }
  function resetValue() {
    setIsModalOpen(false);
    setData(initialValue);
    setTotalPrice(0);
    setAmountError(null);
  }
  function handleCancelModal() {
    resetValue();
  }
};

export default ImportingTable;
