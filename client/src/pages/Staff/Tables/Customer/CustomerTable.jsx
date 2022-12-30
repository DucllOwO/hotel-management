import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./customertable.css";
import CustomerForm from "../../../../components/Form/CustomerForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import { formatDate } from "../../../../Utils/formatter";
import WarningModal from "../../../../components/WarningModal/WarningModal";

const CustomerTable = ({ customer, setCustomer, isLoading }) => {
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
      fixed: "left",
    },
    {
      key: "2",
      title: "Họ và tên",
      width: "30%",
      align: "center",
      fixed: "left",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.id)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.fullname)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.date_of_birth)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone_number)
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
      dataIndex: "fullname",
      render: (text, record) => {
        return text ? String(text) : "";
      },
    },
    {
      key: "3",
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      width: "20%",
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
  ];

  const onDeleteButton = (record) => {
    WarningModal("Bạn có chắc muốn xoá khách hàng?");
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin khách hàng"
          open={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <CustomerForm />
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
            placeholder="Tìm kiếm"
            className="searchInput"
            style={{ width: 264 }}
          />
        </div>
      </div>
      <Table
        loading={isLoading}
        showSorterTooltip={false}
        tableLayout="auto"
        columns={columns}
        dataSource={customer}
        scroll={{ x: 1000, y: "60vh" }}
      ></Table>
    </div>
  );
};

export default CustomerTable;
