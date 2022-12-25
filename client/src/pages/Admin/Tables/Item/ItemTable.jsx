import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, Slider } from "antd";

import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import ItemForm from "../../../../components/Form/ItemForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const ItemTable = ({ items, setItems }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handle = () => {
    setIsModalVisible(false);
  };

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [reserveFilter, setReserveFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  const priceMark = {
    0: "0đ",
    1000000: "1,000,000đ",
  };
  const reserveMark = {
    0: "0",
    200: "200",
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
      title: "Tên sản phẩm",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      width: "30%",
      align: "center",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the name",
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
      key: "3",
      title: "Số lượng tồn",
      dataIndex: "reserve_amount",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.reserve_amount - b.reserve_amount,
      filteredValue: reserveFilter !== null ? [reserveFilter] : null,
      filterDropdown: ({ clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                max={200}
                min={0}
                marks={reserveMark}
                defaultValue={[0, 20]}
                onChange={(e) => {
                  setReserveFilter(null);
                  setReserveFilter(e);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  setReserveFilter(null);
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
      onFilter: (value, record) => {
        if (reserveFilter === null) {
          return record.reserve_amount;
        } else {
          return (
            record.reserve_amount >= value[0] &&
            record.reserve_amount <= value[1]
          );
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
      title: "Giá (đ)",
      dataIndex: "sell_price",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.sell_price - b.sell_price,
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
                  step={5000}
                  range
                  min={0}
                  max={1000000}
                  marks={priceMark}
                  defaultValue={[0, 100000]}
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
          return record.sell_price;
        } else {
          return record.sell_price >= value[0] && record.sell_price <= value[1];
        }
      },
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
    },
    {
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton openEditModal={() => {}}></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setItems((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const upnameDataSource = [...items];
    upnameDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(upnameDataSource);
    setItems(upnameDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin sản phẩm"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <ItemForm />
        </Modal>
      </>
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
            onClick={showModal}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={items}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default ItemTable;
