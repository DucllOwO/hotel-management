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
  const [rentCost, setRentCost] = useState(0);
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
      // sorter: (a, b) => a.customer_id.localeCompare(b.customer_id),
      sorter: (a, b) => a.customer_id - b.customer_id,
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
          String(record.customer_id)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.book_from)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.book_to)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.room_id)
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
      dataIndex: "room_id",
      align: "center",
      sorter: (a, b) => a.room_id.localeCompare(b.room_id),
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
    })
    .catch(() => {
      ErrorAlert("Lấy dữ liệu dịch vụ thất bại")
    });

    console.log(serviceCost)

    await getRoomByBookingID(user?.position, selectedBooking.id).then((data) => {
      console.log(data)
      setUsedRoom(data.data);
    })

    
    Promise.all(usedRoom.map((value) => {
      if(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "hour") < 7)
      {
        console.log("giờ")
        const price = value.first_hour_price + (dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "hour") - 1) * value.hour_price
        return {
          room_name: value.room_name,
          room_type: value.room_type,
          area: value.area,
          price: price
        }
      }
      else 
      {
        if (dayjs(selectedBooking.checkin_time).hour() >=6 && dayjs(selectedBooking.checkin_time).hour() < 12)
        { 
          console.log("ngày")
          if(dayjs(Date.now()).hour() <12)
          {
            const price = (12 - dayjs(selectedBooking.checkin_time).hour()) * value.hour_price + Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.one_day_price;
            return {
              room_name: value.room_name,
              room_type: value.room_type,
              area: value.area,
              price: price
            }
          }
          else if(dayjs(Date.now()).hour() >= 12 && dayjs(Date.now()).hour() < 17)
          {
            const price = ((12 - dayjs(selectedBooking.checkin_time).hour()) + (dayjs(Date.now()).hour() - 12))* value.hour_price + Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.one_day_price;
            return {
              room_name: value.room_name,
              room_type: value.room_type,
              area: value.area,
              price: price
            }
          }
          else
          {
            const price = (12 - dayjs(selectedBooking.checkin_time).hour()) * value.hour_price + Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day") + 1) * value.one_day_price;
            return {
              room_name: value.room_name,
              room_type: value.room_type,
              area: value.area,
              price: price
            }
          } 
        }
        else if(dayjs(selectedBooking.checkin_time).hour() >= 12 && dayjs(selectedBooking.checkin_time).hour() < 17)
        {
          
          if(dayjs(Date.now()).hour() <12)
          {
            const price = Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.one_day_price;
            return {
              room_name: value.room_name,
              room_type: value.room_type,
              area: value.area,
              price: price
            }
          }
          else if(dayjs(Date.now()).hour() >= 12 && dayjs(Date.now()).hour() < 17)
          {
            const price = (dayjs(Date.now()).hour() - 12) * value.hour_price + Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.one_day_price;
            return {
              room_name: value.room_name,
              room_type: value.room_type,
              area: value.area,
              price: price
            }
          }
          else
          {
            const price = Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day") + 1) * value.one_day_price;
            return {
              room_name: value.room_name,
              room_type: value.room_type,
              area: value.area,
              price: price
            }
          }
        }
        else
        {
          console.log("đêm")
          if(dayjs(selectedBooking.checkin_time).hour() >= 21)
          {
            if(dayjs(Date.now()).hour() <12)
            {
              const price = Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price
              }
            }
            else if(dayjs(Date.now()).hour() >= 12 && dayjs(Date.now()).hour() < 17)
            {
              const price = (dayjs(Date.now()).hour() - 12) * value.hour_price + Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price
              }
            }
            else
            {
              const price = Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.one_day_price + value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price
              }
            }
          }
          else
          {
            if(dayjs(Date.now()).hour() <12)
            {
              const price = (21 - dayjs(selectedBooking.checkin_time).hour()) * value.hour_price +  Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price
              }
            }
            else if(dayjs(Date.now()).hour() >= 12 && dayjs(Date.now()).hour() < 17)
            {
              const price = ((21 - dayjs(selectedBooking.checkin_time).hour()) + (dayjs(Date.now()) - 12)) +  Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price
              }
            }
            else
            {
              const price = ((21 - dayjs(selectedBooking.checkin_time).hour()) + (dayjs(Date.now()) - 12)) +  Math.round(dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "day")) * value.one_day_price + value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price
              }
            }
          }
        }
      }
    })).then((data) => {
      console.log(data)

      data.forEach((value) => {
        setRentCost((prev) => prev + value.price)
      })
    })

    
    console.log(rentCost)

    infoForm.validateFields().then( async (data) => {
      console.log("creating")
      const totalCost = rentCost + serviceCost + data.surcharge;
      const newReceipt = {
        established_date: dayjs(Date.now()),
        payment_method: data.method,
        checkout_time: dayjs(Date.now()),
        note: data.note,
        surcharge: data.surcharge,
        service_cost: serviceCost,
        rent_cost: rentCost,
        total_cost: totalCost,
      }
      createReceipt(user?.position, newReceipt, selectedBooking, currentEmployee).then((data) => {
        SuccessAlert("Trả phòng thành công");
        setBooking((prev) => prev.filter((value) => value !== selectedBooking));
        setIsCheckout(false);
        setShowReceipt(true);
        infoForm.resetFields();
        setServiceCost(0);
        setRentCost(0);
        // updateBookingStatus(user?.position,s "2");
      })
      .catch((error) => {
        ErrorAlert("Đã xảy ra lỗi khi tạo hoá đơn");
        throw error
      });
    })
    .catch((value) => {
      ErrorAlert("Vui lòng nhập đủ các thông tin");
      throw value
    })
    
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
        showSorterTooltip={false}
        columns={columns}
        dataSource={booking}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default BookingListTable;
