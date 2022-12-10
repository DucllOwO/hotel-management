import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
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

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      render: (text, record) => {
        return record.id;
      },
      width: "10%",
    },
    {
      key: "2",
      title: "Tên phiếu giảm giá",
      dataIndex: "name",
      render: (text, record) => {
        return record.name;
      },
      width: "25%",
    },
    {
      key: "3",
      title: "Giảm",
      dataIndex: "offer",
      render: (text, record) => {
        return record.offer;
      },
      width: "10%",
    },
    {
      key: "4",
      title: "Hiệu lực",
      dataIndex: "duration",
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
      width: "35%",
    },
    {
      key: "5",
      title: "Hành động",
      render: (_, record) => {
        return (
          <Button onClick={() => onSuspendButton()}>Ngừng hoạt động</Button>
        );
      },
      width: "20%",
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
    <div className="table">
      <>
        <Modal
          title="Thông tin sản phẩm"
          visible={isModalVisible}
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
        scroll={{ y: 350 }}
      ></Table>
    </div>
  );
};

export default PromotionTable;
