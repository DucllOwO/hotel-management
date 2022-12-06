import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Layout } from "antd";
import "antd/dist/antd.less";
import "./bookingtable.css";
import BookingForm from "../../../../../components/Form/BookingForm";
import { createBooking } from "../../../../../api/BookingAPI";
import SuccessAlert from "../../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../../components/Error/Alert/ErrorAlert";
import "./bookingtable.css";

const { Footer, Content } = Layout;

const { RangePicker } = DatePicker;

const BookingTable = ({
  rooms = null,
  setRooms,
  setFrom,
  setTo,
  isLoading,
  user,
  from,
  to,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Phòng",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.size)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "room_name",
    },
    {
      key: "2",

      title: "Loại phòng",
      dataIndex: "roomType",
    },
    {
      key: "3",
      title: "Diện tích",
      dataIndex: "size",
      width: 150,
    },
    {
      key: "4",
      title: "Giá",
      dataIndex: "price",
    },
    {
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                form.setFieldValue("room_name", record.room_name);
              }}
            >
              Đặt
            </Button>
          </>
        );
      },
    },
  ];

  const onBooking = (value) => {};

  const handleOKModal = async () => {
    try {
      const values = await form.validateFields();
      const isCusObjEmpty = Object.keys(currentCustomer).length === 0;
      // isCusObjEmpty === true === customer not available
      if (isCusObjEmpty) {
        //create customer
        // create booking
      } else {
        const currentSelectRoom = rooms.find(
          (room) => room.room_name === values.room_name
        );
        // create booking
        const { data: bookingData } = await createBooking(
          user.position,
          currentCustomer,
          currentSelectRoom,
          from,
          to
        );

        setRooms((pre) => {
          return pre.filter(
            (data) => data.room_name !== bookingData?.room_name
          );
        });
      }
      setCurrentCustomer({});
      SuccessAlert("Đặt phòng thành công.");
      setCurrentCustomer({});
    } catch (error) {
      console.log(error);
      ErrorAlert("Đặt phòng thất bại!");
    }
  };

  const modalJSX = () => {
    return (
      <Modal
        title="Nhập thông tin khách hàng"
        open={true}
        okText="Đặt"
        cancelText="Hủy"
        onOk={handleOKModal}
        onCancel={handleCancelModal}
        width="40%"
      >
        <BookingForm form={form} setCurrentCustomer={setCurrentCustomer} />
      </Modal>
    );
  };

  return (
    <div id="bookingTable">
      <div className="table">
        <>{isModalOpen ? modalJSX() : null}</>
        <div className="buttonContainer">
          <div className="header">
            <div>
              <RangePicker
                format={"DD/MM/YYYY"}
                onChange={(value) => {
                  setFrom(value[0]?._d);
                  setTo(value[1]?._d);
                }}
              />
            </div>
          </div>
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
          columns={columns}
          dataSource={rooms}
          scroll={{ y: "100%" }}
          rowKey={(row) => row.room_name}
        ></Table>
      </div>
      <div id="bottomBar">
        <Button>Đặt</Button>
      </div>
    </div>
  );

  function handleCancelModal() {
    form.resetFields();
    setIsModalOpen(false);
  }
};

export default BookingTable;
