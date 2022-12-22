import React, { useState } from "react";
import "../../index.css";
import { Table, Button, Modal, Form, Input, DatePicker, Checkbox } from "antd";
import BookingForm from "../../../../../components/Form/BookingForm";
import { createBooking } from "../../../../../api/BookingAPI";
import SuccessAlert from "../../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../../components/Error/Alert/ErrorAlert";
import BottomBar from "../../../../../components/Admin/BottomBar/BottomBar";

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
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customerInfoForm] = Form.useForm();
  const [roomForm] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Phòng",
      filteredValue: [searchedText],
      width: "25%",
      align: "center",
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
      width: "25%",
      align: "center",
    },
    {
      key: "3",
      title: "Diện tích",
      dataIndex: "size",
      width: "17%",
      align: "center",
    },
    {
      key: "4",
      title: "Giá",
      dataIndex: "price",
      width: "17%",
      align: "center",
    },
    {
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <Form.Item style={{ marginBottom: 0 }}>
            <Checkbox
              onChange={(e) => {
                setSelectedRooms((prev) => [...prev, record]);
              }}
            ></Checkbox>
          </Form.Item>
        );
      },
    },
  ];

  const onBooking = (value) => {};

  const handleOKModal = async () => {
    // try {
    //   const values = await customerInfoForm.validateFields();
    //   const isCusObjEmpty = Object.keys(currentCustomer).length === 0;
    //   // isCusObjEmpty === true === customer not available
    //   if (isCusObjEmpty) {
    //     //create customer
    //     // create booking
    //   } else {
    //     const currentSelectRoom = rooms.find(
    //       (room) => room.room_name === values.room_name
    //     );
    //     // create booking
    //     const { data: bookingData } = await createBooking(
    //       user.position,
    //       currentCustomer,
    //       currentSelectRoom,
    //       from,
    //       to
    //     );
    //     setRooms((pre) => {
    //       return pre.filter(
    //         (data) => data.room_name !== bookingData?.room_name
    //       );
    //     });
    //   }
    //   setCurrentCustomer({});
    //   SuccessAlert("Đặt phòng thành công.");
    //   setCurrentCustomer({});
    // } catch (error) {
    //   console.log(error);
    //   ErrorAlert("Đặt phòng thất bại!");
    // }
  };

  const openModalInfoCustomer = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bookingTable">
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
      <Form form={roomForm}>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={rooms}
          scroll={{ y: "100%" }}
          rowKey={(row) => row.room_name}
        ></Table>
      </Form>
      <BottomBar>
        <Button type="primary">Đặt</Button>
      </BottomBar>
    </div>
  );

  function modalJSX() {
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
        <BookingForm
          form={customerInfoForm}
          setCurrentCustomer={setCurrentCustomer}
          selectedRooms={selectedRooms}
        />
      </Modal>
    );
  }
  function handleCancelModal() {
    customerInfoForm.resetFields();
    setIsModalOpen(false);
  }
};

export default BookingTable;
