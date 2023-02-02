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
      filter: (a, b) => a.id - b.id,
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
          String(record.name)
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
    },
    {
      key: "2",
      title: "Mã phiếu giảm giá",
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
      title: "Giảm (%)",
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
      // filterDropdown: () => {
      //   return (
      //     <>
      //       <div className="filterContainer">
      //         <div>
      //           <Select
      //             size="medium"
      //             options={items}
      //             showSearch
      //             placeholder="Chọn hiệu lực"
      //             onChange={(e) => {}}
      //           />
      //         </div>
      //         <Button type="primary" style={{ marginTop: "10px" }}>
      //           Reset
      //         </Button>
      //       </div>
      //     </>
      //   );
      // },
      // filterIcon: () => {
      //   return <FilterOutlined />;
      // },
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

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin phiếu giảm giá"
          open={isModalVisible}
          onOk={handleModalOK}
          onCancel={handle}
        >
          <PromotionForm form={form} />
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
        rowKey={(row) => row.key}
        showSorterTooltip={false}
        columns={columns}
        dataSource={vouchers}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );

  function handleModalOK() {}

  function onSuspendButton(record) {
    Modal.confirm({
      title: "Bạn có chắc là muốn dừng hoạt động phiếu giảm giá này không?",
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
    });
  }
};

export default PromotionTable;
