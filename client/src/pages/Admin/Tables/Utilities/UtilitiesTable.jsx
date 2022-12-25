import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UtilitiesForm from "../../../../components/Form/UtilitiesForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const UtilitiesTable = ({ utilities, setUtilities }) => {
  const [isModalVisible, setIsModalVisible] = useState("");

  const showModalAdd = () => {
    setIsModalVisible("add");
  };

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "15%",
      align: "center",
    },
    {
      key: "2",
      title: "Tên tiện ích",
      filteredValue: [searchedText],
      width: "65%",
      align: "center",
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.id)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
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

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setUtilities((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const ModalAddUtil = () => (
    <Modal
      title="Thông tin tiện ích"
      open={true}
      onOk={handleOkModalAdd}
      onCancel={handleCancelModal}
      width="60%"
    >
      <UtilitiesForm form={form} />
    </Modal>
  );

  const ModalEditUtil = (Util) => {
    return (
      <Modal
        title="Thông tin tiện ích"
        open={true}
        onOk={handleOKModalEdit}
        onCancel={handleCancelModal}
        width="60%"
      >
        <UtilitiesForm form={form} />
      </Modal>
    );
  };

  return (
    <div className="table">
      <>{isModalVisible === "add" ? ModalAddUtil() : null}</>
      <>{isModalVisible === "edit" ? <ModalEditUtil /> : null}</>
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
            onClick={() => showModalAdd()}
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
        showSorterTooltip={false}
        columns={columns}
        dataSource={utilities}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );

  function handleOkModalAdd() {}
  function handleOKModalEdit() {}

  function handleCancelModal() {
    setIsModalVisible("");
  }
};

export default UtilitiesTable;
