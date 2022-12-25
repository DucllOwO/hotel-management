import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./customertable.css";
import CustomerForm from "../../../../components/Form/CustomerForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import { formatDate } from "../../../../Utils/formatter";

const CustomerTable = ({ customer, setCustomer }) => {
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
      title: "CCCD",
      dataIndex: "id",
      width: "15%",
    },
    {
      key: "2",
      title: "Họ và tên",
      width: "25%",
      align: "center",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.birthday)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.email)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "fullname",
      render: (text, record) => {
        return text ? String(text) : "";
      },
    },
    {
      key: "3",
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.date_of_birth.localeCompare(b.date_of_birth),
      render: (text, record) => {
        return String(formatDate(record.date_of_birth));
      },
    },
    {
      key: "4",
      title: "Số  điện thoại",
      dataIndex: "phone_number",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
      render: (text, record) => {
        return text ? String(text) : "";
      },
    },
    {
      key: "5",
      title: "Email",
      dataIndex: "email",
      width: "25%",
      align: "center",
      render: (text, record) => {
        return text ? String(text) : "";
      },
    },
    {
      key: "6",
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

  const onAddButton = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newData = {
      idNum: "" + parseInt(customer.length + 1),
      name: "Name " + randomNumber,
      birthday: "23/03/2002",
      address: randomNumber + " address",
    };

    setCustomer((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setCustomer((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...customer];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setCustomer(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin khách hàng"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <CustomerForm />
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
        showSorterTooltip={false}
        tableLayout="auto"
        columns={columns}
        dataSource={customer}
        scroll={{ x: "60vh", y: "100%" }}
      ></Table>
    </div>
  );
};

export default CustomerTable;
