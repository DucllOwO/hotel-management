import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import InventoryForm from "../../../../components/Form/InventoryForm";

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

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Bàn chải đánh răng",
      amount: "10",
      price: "20000",
    },
    {
      id: 2,
      name: "Ly",
      amount: "1",
      price: "20000",
    },
    {
      id: 3,
      name: "Giường",
      amount: "1",
      price: "20000",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "Tên phòng",
      dataIndex: "room_name",
    },
    {
      key: "2",
      title: "Loại phòng",
      dataIndex: "room_type",
      render: (text, record) => {
        return <p>{record.room_type_id.name}</p>;
      },
    },
    {
      key: "3",
      title: "Diện tích phòng",
      dataIndex: "size",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "4",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                showModal();
                form.setFieldValue("room_name", record.room_name);
              }}
            >
              Kiểm tra phòng
            </Button>
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
      <Table columns={columns} dataSource={rooms} scroll={{ y: 410 }}></Table>
    </div>
  );
};

export default InventoryTable;
