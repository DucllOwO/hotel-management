import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";

import { PlusOutlined } from "@ant-design/icons";
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

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
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
      dataIndex: "name",
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
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="minimum"
              rules={[
                {
                  required: true,
                  message: "Please enter the minimum",
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
      title: "Giá",
      dataIndex: "sell_price",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please enter the minimum",
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
      <Table columns={columns} dataSource={items} scroll={{ y: 350 }}></Table>
    </div>
  );
};

export default ItemTable;
