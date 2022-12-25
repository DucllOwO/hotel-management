import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Slider,
  Dropdown,
  Select,
} from "antd";
import { PlusOutlined, FilterOutlined, DownOutlined } from "@ant-design/icons";
import InventoryForm from "../../../../components/Form/InventoryForm";
import TextButton from "../../../../components/TextButton/TextButton";
import CheckButton from "../../../../components/IconButton/CheckButton/CheckButton";

const InventoryTable = ({ rooms }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handle = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");
  const areaMark = {
    10: "10",
    60: "60",
  };

  const [filter, setFilter] = useState("");

  const items = rooms.map((value, index) => {
    return {
      label: "" + value.roomType.toString(),
      value: "" + value.roomType.toString(),
    };
  });

  // const [dataSource, setDataSource] = useState([
  //   {
  //     id: 1,
  //     name: "Bàn chải đánh răng",
  //     amount: "10",
  //     price: "20000",
  //   },
  //   {
  //     id: 2,
  //     name: "Ly",
  //     amount: "1",
  //     price: "20000",
  //   },
  //   {
  //     id: 3,
  //     name: "Giường",
  //     amount: "1",
  //     price: "20000",
  //   },
  // ]);

  const columns = [
    {
      key: "1",
      title: "Tên phòng",
      dataIndex: "room_name",
      width: "26.6666%",
      align: "center",
      sorter: (a, b) => a.room_name.localeCompare(b.room_name),
    },
    {
      key: "2",
      title: "Loại phòng",
      dataIndex: "roomType",
      width: "26.6666%",
      align: "center",
      filteredValue: filter !== "" ? [filter] : null,
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.room_type_id.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      render: (text, record) => {
        return <p>{record.room_type_id.name}</p>;
      },
      filterDropdown: ({ confirm, clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn loại phòng"
                  onChange={(e) => {
                    setFilter(e);
                    clearFilters();
                  }}
                />
              </div>
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setFilter("");
                  clearFilters();
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
    },
    {
      key: "3",
      title: "Diện tích (m2)",
      dataIndex: "size",
      width: "26.6666%",
      align: "center",
      render: (text, record) => {
        return <p>{text}</p>;
      },
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
                onChange={(value) => {}}
              />
              <Button
                type="primary"
                onClick={() => {
                  console.log(rooms);
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
    },
    {
      key: "4",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <CheckButton
              title="Kiểm tra phòng"
              onCheckButton={() => {
                showModal();
                form.setFieldValue("room_name", record.room_name);
              }}
            ></CheckButton>
            {/* <TextButton
              title="Kiểm tra phòng"
              onHandleTextButton={() => {
                showModal();
                form.setFieldValue("room_name", record.room_name);
              }}
            ></TextButton> */}
            {/* <Button
              onClick={() => {
                
              }}
            >
              Kiểm tra phòng
            </Button> */}
          </>
        );
      },
    },
  ];

  function handleOKModalAdd() {
    setIsModalVisible(false);
  }
  function handleCancelModal() {
    setIsModalVisible(false);
  }

  const modalForm = () => {
    return (
      <Modal
        title="Nhập số lượng sản phẩm sử dụng"
        open={true}
        onOk={handleOKModalAdd}
        onCancel={handleCancelModal}
        width="50%"
      >
        <InventoryForm form={form} />
      </Modal>
    );
  };

  return (
    <div className="table">
      <>{isModalVisible ? modalForm() : null}</>
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
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={rooms}
        scroll={{ y: "100%", x: "100%" }}
      ></Table>
    </div>
  );
};

export default InventoryTable;
