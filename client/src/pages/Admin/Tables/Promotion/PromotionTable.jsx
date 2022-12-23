import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PromotionForm from "../../../../components/Form/PromotionForm";

const { RangePicker } = DatePicker;

const dateFormat = "DD-MM-YYYY";

const PromotionTable = ({ vouchers, setVouchers }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handle = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const items = [
    {
      label: "Còn hiệu lực",
      key: "1",
    },
    {
      label: "Hết hiệu lực",
      key: "2",
    },
  ];

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      render: (text, record) => {
        return record.id;
      },
      width: "10%",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Tên phiếu giảm giá",
      dataIndex: "name",
      width: "25%",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return record.name;
      },
    },
    {
      key: "3",
      title: "Giảm",
      dataIndex: "offer",
      align: "center",
      width: "15%",
      sorter: (a, b) => a.offer - b.offer,
      render: (text, record) => {
        return record.offer;
      },
    },
    {
      key: "4",
      title: "Hiệu lực",
      dataIndex: "duration",
      width: "30%",
      align: "center",
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn hiệu lực"
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
      render: (text, record) => {
        return (
          <RangePicker
            suffixIcon={null}
            disabled={true}
            defaultValue={[dayjs(record.valid_from), dayjs(record.valid_from)]}
            format={dateFormat}
          />
        );
      },
    },
    {
      key: "5",
      title: "Hành động",
      render: (_, record) => {
        return (
          <Button onClick={() => onSuspendButton()}>Ngừng hoạt động</Button>
        );
      },
    },
  ];

  // const onAddButton = () => {
  //   const randomNumber = parseInt(Math.random() * 1000);
  //   const newData = {
  //     idNum: "" + parseInt(rooms.length + 1),
  //     name: "Name " + randomNumber,
  //     roomType: "23/03/2002",
  //     area: randomNumber + " area",
  //   };

  //   setRoom((pre) => {
  //     return [...pre, newData];
  //   });
  // };

  const onSuspendButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc là muốn dừng hoạt động phiếu giảm giá này không?",
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
    });
  };

  // const onFinish = (values) => {
  //   console.log(editingRow);
  //   const updateDataSource = [...rooms];
  //   updateDataSource.splice(editingRow - 1, 1, {
  //     ...values,
  //     idNum: editingRow,
  //   });
  //   console.log(updateDataSource);
  //   setRoom(updateDataSource);
  //   setEditingRow(null);
  // };

  return (
    <div className="promotionTable">
      <>
        <Modal
          title="Thông tin sản phẩm"
          open={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <PromotionForm />
        </Modal>
      </>
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
            placeholder="input search text"
            className="searchInput"
            style={{ width: 264 }}
          />
          <Button
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={vouchers}
        scroll={{ y: "100%", x: "100%" }}
      ></Table>
    </div>
  );
};

export default PromotionTable;
