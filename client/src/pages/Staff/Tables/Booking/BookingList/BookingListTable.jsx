import React, { useState } from "react";
import "../../index.css";
import { Table, Button, Modal, Form, Input, Tooltip, Slider } from "antd";
import "./bookingListtable.css";
import dayjs from "dayjs";
import { FilterOutlined } from "@ant-design/icons";
import ErrorAlert from "../../../../../components/Error/Alert/ErrorAlert"
import SuccessAlert from "../../../../../components/Success/SusscessAlert.jsx/SuccessAlert"
import { createReceipt, getInventory, getRoomByBookingID, updateBookingStatus } from "../../../../../api/BookingListAPI";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailForm from "../../../../../components/Form/DetailForm/DetailForm"
import CheckButton from "../../../../../components/IconButton/CheckButton/CheckButton";
import CancelButton from "../../../../../components/IconButton/CancelButton/CancelButton";
import { useContext } from "react";
import { AppContext } from "../../../../../context/AppContext";
import { useEffect } from "react";
import BookingListForm from "../../../../../components/Form/BookingListForm";
import { useForm } from "antd/es/form/Form";
import { fetchEmployeeByUsername } from "../../../../../api/EmployeeAPI";

const BookingListTable = ({ booking, setBooking, setStatus, status }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [selectedBooking, setSelectedBooking] = useState({});
  const [usedRoom, setUsedRoom] = useState([]);
  const [serviceCost, setServiceCost] = useState(0);
  // const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const {user} = useContext(AppContext);
  const [searchedText, setSearchedText] = useState("");
  const [isShowReceipt, setShowReceipt] = useState(false)

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "10%",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Khách hàng",
      width: "20%",
      align: "center",
      filteredValue: [searchedText],
      sorter: (a, b) => a.customer_id.localeCompare(b.customer_id),
      onFilter: (value, record) => {
        return (
          String(record.customer_id)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.book_from)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.book_to)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.size)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "customer_id",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="customer"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer",
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
      title: "Từ ngày",
      dataIndex: "book_from",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.book_from.localeCompare(b.book_from),
    },
    {
      key: "4",
      title: "Đến ngày",
      dataIndex: "book_to",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.book_to.localeCompare(b.book_to),
    },
    {
      key: "5",
      title: "Phòng",
      dataIndex: "size",
      align: "center",
      sorter: (a, b) => a.customer_id.localeCompare(b.customer_id),
    },
    {
      key: "6",
      title: "Thao tác",
      render: (_, record) => {
        if(status === "0")
          return (
            <>
              <div className="btnWrap">
                <CheckButton
                  title="Nhận phòng"
                  onCheckButton={() => {onCheckInButtonHandle(record)}}
                ></CheckButton>
                <CancelButton title="Hủy" onCancelButton={() => {onCancelButtonHandle(record)}}></CancelButton>
              </div>
            </>
          );
        else if (status === "1")
            return (
            <>
              <div className="btnWrap">
                <CheckButton
                  title="Trả phòng"
                  onCheckButton={() => {onCheckOutButtonHandle(record)}}
                ></CheckButton>
              </div>  
            </>
          )
        else
              return (<></>)
      },
    },
  ];
  const onCheckOutButtonHandle = (record) => {
    Modal.confirm({
      title: "Xác nhận khách trả phòng?",
      okText: "Đúng",
      okType: "danger",
      onOk: () => {
        setIsCheckout(true);
        setSelectedBooking(record);
        // updateBookingStatus(user?.position, "2", record.id)
        //   .then((data) => {
        //     SuccessAlert("Trả phòng thành công");
        //     setBooking((prev) => 
        //       prev.filter((value) => {return value.id !== record.id})
        //     )
        //   })
        //   .catch((value) => {
        //     ErrorAlert("Trả phòng thất bại");
        //     throw value;
        //   })
      },
    });
  }
  const onCheckInButtonHandle = (record) => {
    Modal.confirm({
      title: "Xác nhận khách nhận phòng?",
      okText: "Đúng",
      okType: "danger",
      onOk: () => {
          updateBookingStatus(user?.position, "1", record.id)
          .then((data) => {
            SuccessAlert("Nhận phòng thành công");
            setBooking((prev) => 
              prev.filter((value) => {return value.id !== record.id})
            )
          })
          .catch((value) => {
            ErrorAlert("Nhận phòng thất bại");
            throw value;
          })
      },
    });
  }
  const onCancelButtonHandle = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn huỷ phiếu đặt phòng này?",
      okText: "Đúng",
      okType: "danger",
      onOk: () => {
          updateBookingStatus(user?.position, "3", record.id)
          .then((data) => {
            SuccessAlert("Huỷ đặt phòng thành công");
            setBooking((prev) => 
              prev.filter((value) => {return value.id !== record.id})
            )
          })
          .catch((value) => {
            ErrorAlert("Huỷ đặt phòng thất bại");
            throw value;
          })
      },
    });
  } 

  const onBooking = (value) => {
    console.log(value.idNum);
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...booking];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setBooking(updateDataSource);
    setEditingRow(null);
  };
  const handleOKModal = async () => {
    fetchEmployeeByUsername(user?.position, user?.account.username).then((data) => {
      setCurrentEmployee(data.data);
      console.log(data.data)
    });

    console.log(selectedBooking)
    getInventory(user?.position, selectedBooking.id).then((data) => {
      console.log(data.data)
      data.data.forEach((value) => {
        setServiceCost((prev) => { 
          return prev + (value.price * value.amount);
        });
      });
    });

    console.log(serviceCost)

    getRoomByBookingID(user?.position, selectedBooking.id).then((data) => {
      console.log(data)
      setUsedRoom(data.data);
    })

    
    const rentCost = usedRoom.map((value) => {
      if(selectedBooking.book_from.diff(selectedBooking.book_to, "hour") < 6 && dayjs(selectedBooking.book_from).hour() >9 )
      {
        
      }
    })

    infoForm.validateFields().then( async (data) => {
      const newReceipt = {
        established_date: dayjs(Date.now()),
        payment_method: data.method,
        checkout_time: dayjs(Date.now()),
        note: data.note,
        surcharge: data.surcharge,
        service_cost: serviceCost,


      }
      // const {data: receipt} = await createReceipt(user?.position, newReceipt, selectedBooking, currentEmployee);
      SuccessAlert("Trả phòng thành công")
      setServiceCost(0);
    })
    .catch((value) => {
      ErrorAlert("Vui lòng nhập đủ các thông tin");
      throw value
    })

    // updateBookingStatus(user?.position, "2", record.id)
        //   .then((data) => {
        //     SuccessAlert("Trả phòng thành công");
        //     setBooking((prev) => 
        //       prev.filter((value) => {return value.id !== record.id})
        //     )
        //   })
        //   .catch((value) => {
        //     ErrorAlert("Trả phòng thất bại");
        //     throw value;
        //   })

    setIsCheckout(false);
    setShowReceipt(true);
  }
  const handleCancelModal = () => {
    setIsCheckout(false);
    setShowReceipt(false);
  }
  function modalJSX() {
    return (
      <Modal
        title="Trả phòng"
        open={true}
        okText="Xác nhận"
        cancelText="Hủy"
        onOk={handleOKModal}
        onCancel={handleCancelModal}
        width="40%"
      >
        <BookingListForm form={infoForm}/>
      </Modal>
    );
  }
  function receiptJSX() {
    return (
      <Modal
        title="Hoá đơn"
        open={true}
        okText="In hoá đơn"
        cancelText="Hủy"
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        width="40%"
      >
        <DetailForm/>
      </Modal>
    );
  }

  return (
    <div className="bookingListTable">
      <>{isCheckout ? modalJSX() : null}</>
      <>{isShowReceipt ? receiptJSX() : null}</>
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div className="headerButtons">
          <FontAwesomeIcon icon={faSort} className="icon"></FontAwesomeIcon>
          <Button className="headerBtn" onClick={()=>{setStatus("0")}}>Đang đợi</Button>
          <Button className="headerBtn" onClick={()=>{setStatus("1")}}>Đang phục vụ</Button>
          <Button className="headerBtn" onClick={()=>{setStatus("2")}}>Hoàn thành</Button>
          <Button className="headerBtn" onClick={()=>{setStatus("3")}}>Đã huỷ</Button>
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
          {/* <Button
            onClick={() => {}}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button> */}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={booking}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default BookingListTable;
