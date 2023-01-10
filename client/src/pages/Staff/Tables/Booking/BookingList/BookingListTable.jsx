import React, { useEffect, useState } from "react";
import "../../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import "./bookingListtable.css";
import dayjs from "dayjs";
import BookingListExpand from "../../../../../components/ExpandedTable/BookingListExpand";
import ErrorAlert from "../../../../../components/Error/Alert/ErrorAlert";
import SuccessAlert from "../../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import {
  createReceipt,
  getInventory,
  getRoomByBookingID,
  updateBookingStatus,
} from "../../../../../api/BookingListAPI";
import DetailForm from "../../../../../components/Form/DetailForm/DetailForm";
import CheckButton from "../../../../../components/IconButton/CheckButton/CheckButton";
import CancelButton from "../../../../../components/IconButton/CancelButton/CancelButton";
import { useContext } from "react";
import { AppContext } from "../../../../../context/AppContext";
import BookingListForm from "../../../../../components/Form/BookingListForm";
import { fetchEmployeeByUsername } from "../../../../../api/EmployeeAPI";

const DATE_FORMAT_FULL = "HH:mm DD-MM-YYYY";
const DATE_FORMAT = "DD-MM-YYYY";

const BookingListTable = ({
  booking,
  setBooking,
  setStatus,
  status,
  isLoading,
}) => {
  const [bookingSearchDay, setBookingSearchDay] = useState(
    booking.map((value) => value)
  );
  useEffect(() => {
    setBookingSearchDay(booking.map((value) => value));
  }, [booking]);

  const [isCheckout, setIsCheckout] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [selectedBooking, setSelectedBooking] = useState({});
  const [usedRoom, setUsedRoom] = useState([]);
  const [usedService, setUsedService] = useState([]);
  // const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [receipt, setReceipt] = useState({});
  const { user } = useContext(AppContext);
  const [searchedText, setSearchedText] = useState("");
  // const [isShowReceipt, setShowReceipt] = useState(false);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Khách hàng",
      // width: "20%",
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
        return <p>{text}</p>;
      },
    },
    {
      key: "3",
      title: "Từ ngày",
      dataIndex: "book_from",
      // width: "20%",
      align: "center",
      sorter: (a, b) => a.book_from.localeCompare(b.book_from),
      render: (text, record) => {
        return dayjs(convertToValidDateString(text))
          // .startOf("day")
          .format(DATE_FORMAT_FULL);
      },
    },
    {
      key: "4",
      title: "Đến ngày",
      dataIndex: "book_to",
      // width: "20%",
      align: "center",
      sorter: (a, b) => a.book_to.localeCompare(b.book_to),
      render: (text, record) => {
        return dayjs(convertToValidDateString(text)).format(DATE_FORMAT_FULL);
      },
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
        if (status === "0")
          return (
            <>
              <div className="btnWrap">
                <CheckButton
                  title="Nhận phòng"
                  onCheckButton={() => {
                    onCheckInButtonHandle(record);
                  }}
                ></CheckButton>
                <CancelButton
                  title="Hủy"
                  onCancelButton={() => {
                    onCancelButtonHandle(record);
                  }}
                ></CancelButton>
              </div>
            </>
          );
        else if (status === "1")
          return (
            <>
              <div className="btnWrap">
                <CheckButton
                  title="Trả phòng"
                  onCheckButton={() => {
                    onCheckOutButtonHandle(record);
                  }}
                ></CheckButton>
              </div>
            </>
          );
        else return <></>;
      },
    },
  ];

  const columnsNoAction = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Khách hàng",
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
        return <p>{text}</p>;
      },
    },
    {
      key: "3",
      title: "Từ ngày",
      dataIndex: "book_from",
      align: "center",
      sorter: (a, b) => a.book_from.localeCompare(b.book_from),
      render: (text, record) => {
        return dayjs(convertToValidDateString(text)).format(DATE_FORMAT_FULL);
      },
    },
    {
      key: "4",
      title: "Đến ngày",
      dataIndex: "book_to",
      align: "center",
      sorter: (a, b) => a.book_to.localeCompare(b.book_to),
      render: (text, record) => {
        return dayjs(convertToValidDateString(text)).format(DATE_FORMAT_FULL);
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
  };
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
              prev.filter((value) => {
                return value.id !== record.id;
              })
            );
          })
          .catch((value) => {
            ErrorAlert("Nhận phòng thất bại");
            throw value;
          });
      },
    });
  };
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
              prev.filter((value) => {
                return value.id !== record.id;
              })
            );
          })
          .catch((value) => {
            ErrorAlert("Huỷ đặt phòng thất bại");
            throw value;
          });
      },
    });
  };

  const handleOKModal = async () => {
    //Fetch employee information
    let serviceCost = 0;
    let rentCost = 0;
    let tempEmployee;
    await fetchEmployeeByUsername(user?.position, user?.account.username)
      .then((data) => {
        setCurrentEmployee(data.data);
        console.log(data.data);
        tempEmployee = JSON.parse(JSON.stringify(data.data));
      })
      .catch(() => {
        ErrorAlert("Lấy dữ liệu nhân viên không thành công");
      });

    console.log(selectedBooking);
    //fetch service used
    await getInventory(user?.position, selectedBooking.id)
      .then(async (data) => {
        console.log(data.data);
        if (data.data) {
            data.data.forEach((value) => {
              value.inventory_detail.forEach((item) => {
                const newServiceCost = item.price * item.amount;
                serviceCost = serviceCost + newServiceCost;
                return {
                  item_name: item.item_id.name,
                  amount: item.amount,
                  price: item.price,
                  total_cost: newServiceCost,
                };
              })
            })
        }
      })
      .catch(() => {
        ErrorAlert("Lấy dữ liệu dịch vụ thất bại");
      });

    //fetch room information (contains all price);
    await getRoomByBookingID(user?.position, selectedBooking.id).then(
      (data) => {
        console.log(data.data);
        const rentRoomArray = calcRentCost(data.data);
        console.log(rentRoomArray);
        console.log(serviceCost);
        rentRoomArray.forEach((value) => {
          console.log(value);
          rentCost = rentCost + value.price;
        });
        setUsedRoom(rentRoomArray);
      }
    );

    // calculate rent cost
    console.log(serviceCost);
    console.log(rentCost);
    await createReceiptFunc(rentCost, serviceCost, tempEmployee);
  };
  const createReceiptFunc = async (
    rentCost,
    serviceCost,
    currentEmployeeTemp
  ) => {
    let totalCost = rentCost + serviceCost;
    infoForm
      .validateFields()
      .then(async (data) => {
        if (data.surcharge) totalCost = totalCost + data.surcharge;
        const newReceipt = {
          established_date: dayjs(Date.now()),
          payment_method: data.method,
          checkout_time: dayjs(Date.now()),
          note: data.note,
          surcharge: data.surcharge,
          service_cost: serviceCost,
          rent_cost: rentCost,
          total_cost: totalCost,
        };
        await createReceipt(
          user?.position,
          newReceipt,
          selectedBooking,
          currentEmployeeTemp
        )
          .then((data) => {
            setReceipt(data.data[0]);
            console.log(data.data);
            SuccessAlert("Trả phòng thành công");
            setBooking((prev) =>
              prev.filter((value) => value !== selectedBooking)
            );
            setIsCheckout(false);
            // setShowReceipt(true);
            infoForm.resetFields();
            updateBookingStatus(user?.position, "2", selectedBooking.id);
            console.log(usedRoom);
            console.log(usedService);
          })
          .catch((error) => {
            ErrorAlert("Đã xảy ra lỗi khi tạo hoá đơn");
            throw error;
          });
      })
      .catch((value) => {
        ErrorAlert("Vui lòng nhập đủ các thông tin");
        throw value;
      });
  };
  const calcRentCost = (usedRoom) => {
    // console.log(usedRoom);
    return usedRoom.map((value) => {
      //hour price
      // if (dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "hour") < 7) 
    
      // } //day or overnight price
      // else {
      //   //day checkin before 12
        if (dayjs(selectedBooking.book_from).hour() === 12) 
        {
          if(dayjs(selectedBooking.checkin_time) < dayjs(selectedBooking.book_from))
          {
            console.log("giá ngày checkin sớm");
          //day checkout before 12
            if (dayjs(Date.now()) < dayjs(selectedBooking.book_to)) {
              console.log("giá ngày checkout sớm");
              const price =
                (dayjs(selectedBooking.book_from).hour() - 
                dayjs(selectedBooking.checkin_time).hour()) *
                  value.hour_price +
                Math.round(
                  dayjs(selectedBooking.book_to).diff(
                    dayjs(selectedBooking.book_from),
                    "day"
                  )
                ) *
                  value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //day after 12 and before 17 (surcharge)
            else if (
              dayjs(Date.now()) >= dayjs(selectedBooking.book_to) &&
              dayjs(Date.now()).hour() < 17
            ) {
              console.log("giá ngày checkout trễ phụ thu");
              const price =
                (12 -
                  dayjs(selectedBooking.checkin_time).hour() +
                  (dayjs(Date.now()).hour() - dayjs(selectedBooking.book_to).hour())) *
                  value.hour_price +
                Math.round(
                  dayjs(Date.now()).diff(
                    dayjs(selectedBooking.book_from),
                    "day"
                  )
                ) *
                  value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            else if (
              dayjs(Date.now()) >= dayjs(selectedBooking.book_to) &&
              dayjs(Date.now()).hour() >= 17)
            {
              console.log("giá ngày checkout trễ thêm 1 ngày");
              const price =
                (dayjs(selectedBooking.book_from).hour() - 
                dayjs(selectedBooking.checkin_time).hour()) *
                  value.hour_price +
                Math.round(
                  dayjs(Date.now()).diff(
                    dayjs(selectedBooking.book_from),
                    "day"
                  ) + 1
                ) *
                  value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
          }
          //day after 17 (add 1 more day)
          else if (
            dayjs(selectedBooking.checkin_time) >= dayjs(selectedBooking.book_from)
          ) {
            console.log("ngày checkin đúng");
            //day checkout ontime
            if (dayjs(Date.now()) < dayjs(selectedBooking.book_to)) {
              console.log("giá ngày checkout sớm");
  
              const price =
                Math.round(
                  dayjs(Date.now()).diff(
                    dayjs(selectedBooking.book_from),
                    "day"
                  )
                ) * value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //day checkout late with surcharge
            else if (
              dayjs(Date.now()) >= dayjs(selectedBooking.book_to) &&
              dayjs(Date.now()).hour() < 17
            ) {
              console.log("giá ngày checkout trễ phụ thu");
              console.log((dayjs(Date.now()).hour() - 12) * value.hour_price);
              console.log(
                dayjs(Date.now()).diff(
                  dayjs(selectedBooking.checkin_time),
                  "day"
                ) * value.one_day_price
              );
              const price =
                (dayjs(Date.now()).hour() - 12) * value.hour_price +
                dayjs(Date.now()).diff(
                  dayjs(selectedBooking.checkin_time),
                  "day"
                ) *
                  value.one_day_price;
              console.log(price);
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //day checkout late add 1 more day
            else {
              console.log("giá ngày checkout trễ thêm 1 ngày");
  
              const price =
                Math.round(
                  dayjs(Date.now()).diff(
                    dayjs(selectedBooking.book_from),
                    "day"
                  ) + 1
                ) * value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
          }
        }
        //day checkin after 12
        //overnight
        else if(dayjs(selectedBooking.book_from).hour() === 21){
          console.log("giá đêm");
          //night ontime
          if (
            dayjs(selectedBooking.checkin_time) >= dayjs(selectedBooking.book_from) ||
            dayjs(selectedBooking.checkin_time).hour() < 2
          ) {
            console.log("đêm sau checkin đúng");
            //night checkout ontime
            if (dayjs(Date.now()) < dayjs(selectedBooking.book_to))
            {
              console.log("trả đúng");
              const price = value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //night checkout late with surcharge
            else if (
              dayjs(Date.now()) >= dayjs(selectedBooking.book_to) &&
              dayjs(Date.now()).hour() < 17
            ) {
              console.log("trả trễ phụ thu");

              const price = (dayjs(Date.now()).hour() - 12) * value.hour_price + value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //night checkout late become 1 day
            else {
              console.log("trả trễ 1 ngày");

              const price = value.overnight_price + value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
          }
          //night checkout before 21
          else {
            console.log("đêm sớm");
            // night checkin soon and checkout ontime
            if (dayjs(Date.now()).hour() < 12) {
              console.log("đêm trả phòng đúng");
              // console.log(
              //   dayjs(Date.now()).diff(
              //     dayjs(selectedBooking.checkin_time),
              //     "day"
              //   )
              // );
              // console.log(dayjs(selectedBooking.checkin_time).hour());
              const price =
                (dayjs(selectedBooking.book_from).hour() - dayjs(selectedBooking.checkin_time).hour()) *
                  value.hour_price +
                  value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //night checkin soon and checkout late with surcharge
            else if (
              dayjs(Date.now()).hour() >= dayjs(selectedBooking.book_to) &&
              dayjs(Date.now()).hour() < 17
            ) {
              console.log("trả trễ phụ thu");

              const price =
              (dayjs(selectedBooking.book_from).hour() -
                dayjs(selectedBooking.checkin_time).hour()) *
                value.hour_price + 
                (dayjs(Date.now()).hour() - 
                dayjs(selectedBooking.book_to).hour()) *
                value.hour_price + 
                  value.overnight_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
            //night checkin soon and check out late, become 1 day full
            else {
              console.log("trả trễ 1 ngày");

              const price =
              (dayjs(selectedBooking.book_from).hour() -
              dayjs(selectedBooking.checkin_time).hour()) *
              value.hour_price +
              value.overnight_price + 
              value.one_day_price;
              return {
                room_name: value.room_name,
                room_type: value.room_type,
                area: value.area,
                price: price,
              };
            }
          }
        }
        else{
          console.log("giá giờ");
          const price =
            value.first_hour_price +
            (dayjs(Date.now()).diff(dayjs(selectedBooking.checkin_time), "hour") -
              1) *
              value.hour_price;
          console.log(price);
          return {
            room_name: value.room_name,
            room_type: value.room_type,
            area: value.area,
            price: price,
          };
        }
      }
    );
  };

  const handleCancelModal = () => {
    setUsedRoom([]);
    setUsedService([]);
    setIsCheckout(false);
    // setShowReceipt(false);
  };
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
        <BookingListForm form={infoForm} />
      </Modal>
    );
  }
  // function receiptJSX() {
  //   return (
  //     <Modal
  //       title="Hoá đơn"
  //       open={true}
  //       footer={null}
  //       onOk={handleCancelModal}
  //       onCancel={handleCancelModal}
  //       width="60%"
  //     >
  //       <DetailForm
  //         receipt={receipt}
  //         usedRoom={usedRoom}
  //         usedService={usedService}
  //         rowIndex={0}
  //       />
  //     </Modal>
  //   );
  // }

  return (
    <div className="table">
      <>{isCheckout ? modalJSX() : null}</>
      {/* <>{isShowReceipt ? receiptJSX() : null}</> */}
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div className="headerButtons">
          <Button
            type={status === "0" ? "primary" : "default"}
            className="headerBtn"
            onClick={() => {
              setStatus("0");
            }}
          >
            Đang đợi
          </Button>
          <Button
            type={status === "1" ? "primary" : "default"}
            className="headerBtn"
            onClick={() => {
              setStatus("1");
            }}
          >
            Đang phục vụ
          </Button>
          <Button
            type={status === "2" ? "primary" : "default"}
            className="headerBtn"
            onClick={() => {
              setStatus("2");
            }}
          >
            Hoàn thành
          </Button>
          <Button
            type={status === "3" ? "primary" : "default"}
            className="headerBtn"
            onClick={() => {
              setStatus("3");
            }}
          >
            Đã huỷ
          </Button>
        </div>
        <div>
          {/* <Button
            onClick={() => {
              console.log(status === "2");
            }}
          ></Button> */}
          <DatePicker
            placeholder="Chọn thời gian"
            onChange={(dayjsObj) => {
              console.log(bookingSearchDay);
              console.log(dayjsObj);
              if (dayjsObj)
                setBookingSearchDay(
                  booking.filter((value) => {
                    const startOfDay = dayjsObj.startOf("day");
                    const endOfDay = dayjsObj.endOf("day");
                    const dayToCampare = dayjs(value.book_to);
                    console.log(dayToCampare.isBetween(startOfDay, endOfDay));
                    if (dayToCampare.isBetween(startOfDay, endOfDay))
                      return true;
                    return false;
                  })
                );
              else setBookingSearchDay(booking);
            }}
            picker="date"
            format={DATE_FORMAT}
            style={{ marginRight: "5px" }}
          ></DatePicker>
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
        loading={isLoading}
        rowKey={(row) => row.id}
        showSorterTooltip={false}
        columns={status === "2" || status === "3" ? columnsNoAction : columns}
        dataSource={bookingSearchDay}
        scroll={{ y: "60vh", x: "100%" }}
        expandable={{
          expandedRowRender: (record) => {
            return <BookingListExpand roomTypeSource={record.room_type} />;
          },
        }}
      ></Table>
    </div>
  );

  function convertToValidDateString(date) {
    return date.replace("T", " ");
  }
};

export default BookingListTable;
