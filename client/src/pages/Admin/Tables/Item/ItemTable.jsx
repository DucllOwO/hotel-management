import React, { useState, useContext } from "react";
import "../index.css";

import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import { Table, Button, Modal, Form, Input, Slider } from "antd";
import { createItem, updateItem } from "../../../../api/ItemAPI";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import ItemForm from "../../../../components/Form/ItemForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const ItemTable = ({ items, setItems, user, isLoading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [editingRow, setEditingRow] = useState(null);
  // const {user} = useContext(AppContext);
  const [itemForm] = Form.useForm();
  const [newItem, setNewItem] = useState({});
  const [searchedText, setSearchedText] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [reserveFilter, setReserveFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const minPrice = Math.min(...items.map((items) => items.sell_price));
  const price = Math.max(...items.map((items) => items.sell_price));
  const minReserve = Math.min(...items.map((items) => items.reserve_amount));
  const reserve = Math.max(...items.map((items) => items.reserve_amount));

  const priceMark = {
    [minPrice]: minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ",
    [price]: price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ",
  };
  const reserveMark = {
    [minReserve]: minReserve.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [reserve]: reserve.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
        return (
          String(record.name)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.id)
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
                max={reserve}
                min={minReserve}
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
                  min={minPrice}
                  max={price}
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
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton
                onEditButton={() => {
                  setSelectedItem(record);
                  onEditButton(record);
                }}
              ></EditButton>
            </div>
          </>
        );
      },
    },
  ];
  const onEditButton = async (record) => {
    setIsEditing(true);
    itemForm.setFieldValue("name", record.name);
    itemForm.setFieldValue("reserve_amount", record.reserve_amount);
    itemForm.setFieldValue("sell_price", record.sell_price);
    setIsModalVisible(true);
    // reserve_amount: selectedItem.reserve_amount,
    // sell_price: selectedItem.sell_price
    // })
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
  const handleCancelModal = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    itemForm.resetFields();
  };
  const handleOKModal = () => {
    itemForm
      .validateFields()
      .then(async (value) => {
        console.log(value);
        if (isEditing) {
          setSelectedItem((prev) => {
            return {
              ...prev,
              reserve_amount: value.reserve_amount,
              sell_price: value.sell_price,
            };
          });
          try {
            console.log(selectedItem);
            const { data: editedData } = await updateItem(
              user?.position,
              selectedItem.id,
              value
            );
            setItems((prev) => {
              prev.map((item) => {
                if (item.id === selectedItem.id) {
                  setSelectedItem((prev) => {
                    return {
                      ...prev,
                      reserve_amount: value.reserve_amount,
                      sell_price: value.sell_price,
                    };
                  });
                }
              });
            });
            SuccessAlert("Cập nhật sản phẩm thành công");
            setIsModalVisible(false);
            itemForm.resetFields();
          } catch {
            ErrorAlert("Đã xảy ra lỗi khi cập nhật sản phẩm");
          }
        } else {
          try {
            const { data: itemData } = await createItem(user?.position, value);
            setItems((prev) => {
              console.log(itemData);
              return [...prev, itemData.data[0]];
            });
            SuccessAlert("Tạo sản phẩm mới thành công");
            itemForm.resetFields();
            setIsModalVisible(false);
          } catch {
            ErrorAlert("Đã xảy ra lỗi khi tạo sản phẩm");
          }
        }
      })
      .catch((value) => {
        ErrorAlert("Vui lòng nhập dữ liệu");
        throw value;
      });
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin sản phẩm"
          visible={isModalVisible}
          onOk={handleOKModal}
          onCancel={handleCancelModal}
        >
          <ItemForm form={itemForm} item={selectedItem} isEditing={isEditing} />
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
        loading={isLoading}
        showSorterTooltip={false}
        columns={columns}
        dataSource={items}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default ItemTable;
