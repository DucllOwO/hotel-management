import React, { useState } from "react";
import "../index.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Slider,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import RoomTypeForm from "../../../../components/Form/RoomTypeForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const RoomTypeTable = ({ roomTypes, setRoomTypes }) => {
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

  const maxCustomerMark = {
    1: "1",
    10: "10",
  };
  const bedAmountMark = {
    1: "1",
    5: "5",
  };
  const areaMark = {
    10: "10",
    60: "60",
  };

  const priceMark = {
    100000: "100,000đ",
    10000000: "10,000,000đ",
  };

  const items = [
    {
      label: "Loại 1",
      key: "1",
    },
    {
      label: "Luxury",
      key: "2",
    },
    {
      label: "President",
      key: "3",
    },
  ];

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "5%",
      align: "center",
    },
    {
      key: "2",
      title: "Tên loại phòng",
      filteredValue: [searchedText],
      align: "center",
      onFilter: (value, record) => {
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      dataIndex: "name",
      render: (text, record) => {
        return <p>{text}</p>;
      },
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn loại phòng"
                  onChange={(e) => {}}
                />
              </div>
              <Button type="primary" style={{ marginTop: "10px" }}>
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "3",
      title: "Số lượng khách",
      dataIndex: "max_customers",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return <p>{text}</p>;
      },
      sorter: (a, b) => a.max_customers - b.max_customers,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                formatter={(value) => value.toString().replace(".", ",")}
                parser={(input) => input.replace(/[^\w\,-]+/g, "")}
                range
                max={10}
                min={1}
                defaultValue={[1, 4]}
                marks={maxCustomerMark}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "4",
      title: "Số giường",
      dataIndex: "bed_amount",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return <p>{text}</p>;
      },
      sorter: (a, b) => a.bed_amount - b.bed_amount,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                defaultValue={[1, 2]}
                max={5}
                min={1}
                marks={bedAmountMark}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "5",
      title: "Diện tích (m2)",
      dataIndex: "area",
      align: "center",
      width: "15%",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập diện tích",
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
      sorter: (a, b) => a.area - b.area,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                max={60}
                min={10}
                marks={areaMark}
                defaultValue={[10, 20]}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "6",
      title: "Giá",
      dataIndex: "price",
      align: "center",
      width: "20%",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá",
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
      sorter: (a, b) => a.price - b.price,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <div className="priceSlider">
                <Slider
                  width={0.8}
                  range
                  min={100000}
                  max={10000000}
                  marks={priceMark}
                  defaultValue={[100000, 1000000]}
                  onChange={(value) => {}}
                />
                <Button type="primary">Reset</Button>
              </div>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "7",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton openModalEdit={() => {}}></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
            {/* <div className="btnWrap">
              <SaveButton onSaveButton={() => {}}></SaveButton>
            </div> */}
            {/* <Button
              htmlType="submit"
              // onClick={() => {form.submit()}}
            >
              Lưu
            </Button>
            <Button
              onClick={() => {
                setEditingRow(null);
              }}
            >
              Huỷ
            </Button> */}
          </>
        );
      },
    },
  ];

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "OK",
      okType: "danger",
      onOk: () => {
        setRoomTypes((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...roomTypes];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setRoomTypes(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin loại phòng"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <RoomTypeForm></RoomTypeForm>
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
        dataSource={roomTypes}
        scroll={{ y: "60vh", x: "100%" }}
        rowKey={(row) => row.id}
      ></Table>
    </div>
  );
};

export default RoomTypeTable;
