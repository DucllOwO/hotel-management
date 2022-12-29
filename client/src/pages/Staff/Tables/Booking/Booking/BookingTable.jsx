import React, { useState } from "react";
import "../../index.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Select,
  Slider,
} from "antd";
import dayjs from "dayjs";
import { FilterOutlined } from "@ant-design/icons";
import BookingForm from "../../../../../components/Form/BookingForm";
import { createBooking, createCustomer } from "../../../../../api/BookingAPI";
import SuccessAlert from "../../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../../components/Error/Alert/ErrorAlert";
import BottomBar from "../../../../../components/Admin/BottomBar/BottomBar";
import RoomTypeExpand from "../../../../../components/ExpandedTable/RoomTypeExpand";
import { getRoomUtilsByRoomTypeID } from "../../../../../api/hasRoomFeatures";
import { getRoomTypeByID } from "../../../../../api/RoomTypeAPI";
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
  listType,
  positionUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customerInfoForm] = Form.useForm();
  const [roomForm] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [filter, setFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState(null);

  const [priceFilter, setPriceFilter] = useState("");
  const [sliderFilter, setSliderFilter] = useState([0, 5000000]);

  const items = listType.map((item) => {
    return {
      label: "" + item.name.toString(),
      value: "" + item.name.toString(),
    };
  });

  const priceItems = [
    {
      label: "Một ngày",
      value: "Một ngày",
    },
    {
      label: "Qua đêm",
      value: "Qua đêm",
    },
    {
      label: "Giờ đầu tiên",
      value: "Giờ đầu tiên",
    },
    {
      label: "Giờ tiếp theo",
      value: "Giờ tiếp theo",
    },
  ];

  const areaMark = {
    10: "10",
    100: "100",
  };

  const priceMark = {
    0: "0đ",
    5000000: "5,000,000đ",
  };

  const columns = [
    {
      key: "1",
      title: "Phòng",
      filteredValue: [searchedText],
      width: "25%",
      align: "center",
      sorter: (a, b) => a.room_name.localeCompare(b.room_name),
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType)
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
      dataIndex: "room_name",
    },
    {
      key: "2",
      title: "Loại phòng",
      dataIndex: "roomType",
      width: "25%",
      align: "center",
      filteredValue: filter !== "" ? [filter] : null,
      onFilter: (value, record) => {
        return String(record.roomType)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      ellipsis: true,
      filterDropdown: ({ clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={priceItems}
                  showSearch
                  placeholder="Chọn loại giá"
                  onChange={(e) => {
                    setFilter(e);
                    clearFilters();
                  }}
                />
              </div>
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setFilter("");
                  clearFilters();
                }}
              >
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return (
          <FilterOutlined
          // className={filter ? "filterActive" : "filterNormal"}
          />
        );
      },
    },
    {
      key: "3",
      title: "Diện tích (m2)",
      dataIndex: "area",
      width: "17%",
      align: "center",
      sorter: (a, b) => a.area - b.area,
      filteredValue: areaFilter !== null ? [areaFilter] : null,
      filterDropdown: ({ clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                max={100}
                min={10}
                step={10}
                marks={areaMark}
                defaultValue={[10, 30]}
                onChange={(e) => {
                  setAreaFilter(null);
                  setAreaFilter(e);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  setAreaFilter(null);
                  clearFilters({ closeDropdown: true });
                }}
              >
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
      onFilter: (value, record) => {
        if (areaFilter === null) {
          return record.area;
        } else {
          return record.area >= value[0] && record.area <= value[1];
        }
      },
    },
    {
      key: "4",
      title:
        priceFilter !== "" ? "Giá " + priceFilter + " (đ)" : "Giá Một ngày (đ)",
      dataIndex:
        priceFilter === "Qua đêm"
          ? "overnight_price"
          : priceFilter === "Giờ đầu tiên"
          ? "first_hour_price"
          : priceFilter === "Giờ tiếp theo"
          ? "hour_price"
          : "one_day_price",
      filteredValue: priceFilter !== "" ? [priceFilter] : null,
      dataIndex: "price",
      width: "17%",
      align: "center",
      sorter: (a, b) =>
        priceFilter === "Qua đêm"
          ? a.overnight_price - b.overnight_price
          : priceFilter === "Giờ đầu tiên"
          ? a.first_hour_price - b.first_hour_price
          : priceFilter === "Giờ tiếp theo"
          ? a.hour_price - b.hour_price
          : a.one_day_price - b.one_day_price,
      filterDropdown: ({ confirm, clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div className="priceSlider">
                <Select
                  style={{ width: 300 }}
                  size="medium"
                  options={priceItems}
                  showSearch
                  defaultValue="Một ngày"
                  placeholder="Chọn phân loại giá"
                  onChange={(e) => {
                    setPriceFilter(e);
                  }}
                />
                <Slider
                  tipFormatter={(value) => {
                    return `${value < 0 ? "-" : ""} ${Math.abs(value)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                  }}
                  step={10000}
                  width={0.8}
                  range
                  min={0}
                  max={5000000}
                  marks={priceMark}
                  defaultValue={[0, 300000]}
                  onChange={(value) => {
                    setSliderFilter(value);
                    if (priceFilter === "") {
                      setPriceFilter("Một ngày");
                    } else {
                      const temp = priceFilter;
                      setPriceFilter("");
                      setPriceFilter(temp);
                    }
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    setPriceFilter("");
                    clearFilters({ closeDropdown: true });
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
      onFilter: (value, record) => {
        switch (priceFilter) {
          case "" || "Một ngày":
            return (
              record.one_day_price >= sliderFilter[0] &&
              record.one_day_price <= sliderFilter[1]
            );
          case "Qua đêm":
            return (
              record.overnight_price >= sliderFilter[0] &&
              record.overnight_price <= sliderFilter[1]
            );
          case "Giờ đầu tiên":
            return (
              record.first_hour_price >= sliderFilter[0] &&
              record.first_hour_price <= sliderFilter[1]
            );
          case "Giờ tiếp theo":
            return (
              record.hour_price >= sliderFilter[0] &&
              record.hour_price <= sliderFilter[1]
            );
          default:
            return (
              record.one_day_price >= sliderFilter[0] &&
              record.one_day_price <= sliderFilter[1]
            );
        }
      },
      render: (value) => {
        return `${value < 0 ? "-" : ""} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
    },
    {
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <Form.Item style={{ marginBottom: 0 }}>
            <Checkbox
              onChange={(e) => {
                console.log(e);
                if (!selectedRooms.includes(record))
                  setSelectedRooms((prev) => [...prev, record]);
                else if (selectedRooms.includes(record))
                  setSelectedRooms((prev) =>
                    prev.filter((data) => data !== record)
                  );
              }}
            ></Checkbox>
          </Form.Item>
        );
      },
    },
  ];

  const onBooking = (value) => {};

  const handleOKModal = async () => {
    try {
      const isCusObjEmpty = Object.keys(currentCustomer).length === 0;
      // isCusObjEmpty === true === customer not available
      console.log(currentCustomer);
      console.log(isCusObjEmpty);
      if (isCusObjEmpty) {
        customerInfoForm
          .validateFields()
          .then(async (value) => {
            const birthday = dayjs(
              customerInfoForm.getFieldValue("date_of_birth")
            );
            const now = dayjs(Date.now());
            if (now.diff(birthday, "year") < 18) {
              ErrorAlert("Khách hàng chưa đủ 18 tuổi");
              return;
            }
            const newCustomer = {
              id: value.id,
              fullname: value.fullname,
              phone_number: value.phone_number,
              date_of_birth: value.date_of_birth,
            };
            const { data: userData } = await createCustomer(
              user?.position,
              newCustomer
            );
            setCurrentCustomer(newCustomer);
            booking(userData);
          })
          .catch((value) => {
            ErrorAlert("Vui lòng nhập đầy đủ thông tin");
            throw value;
          });
      } else booking(currentCustomer);
      // setCurrentCustomer({});
    } catch (error) {
      console.log(error);
      ErrorAlert("Đặt phòng thất bại!");
    }
  };
  const booking = async (customer) => {
    const { data: bookingData } = await createBooking(
      user?.position,
      customer,
      selectedRooms,
      from,
      to
    );

    console.log(selectedRooms);
    setRooms((pre) => {
      return pre.filter(
        (data) => !selectedRooms.includes(data)
        // data.room_name !== bookingData?.room_name
      );
    });
    console.log(rooms);
    SuccessAlert("Đặt phòng thành công.");
    setCurrentCustomer({});
    setSelectedRooms([]);
    setIsModalOpen(false);
    customerInfoForm.resetFields();
  };

  const openModalInfoCustomer = () => {
    if (selectedRooms.length !== 0) setIsModalOpen(true);
    else ErrorAlert("Vui lòng chọn phòng cần đặt");
  };

  return (
    <div className="table">
      <>{isModalOpen ? modalJSX() : null}</>
      <div className="buttonContainer">
        <div className="header">
          <div>
            <RangePicker
              showTime
              format={"DD/MM/YYYY hh:mm:ss"}
              onChange={(value) => {
                console.log(value);
                setFrom(value[0]?.$d);
                setTo(value[1]?.$d);
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
          showSorterTooltip={false}
          loading={isLoading}
          columns={columns}
          dataSource={rooms}
          scroll={{ y: "60vh", x: "100%" }}
          rowKey={(row) => row.room_name}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <RoomTypeExpand
                  utils={record.utils}
                  firstHourPrice={record.room_type_id.first_hour_price}
                  overNightPrice={record.room_type_id.overnight_price}
                  oneDayPrice={record.room_type_id.one_day_price}
                  hourPrice={record.room_type_id.hour_price}
                />
              );
            },
            onExpand: (expanded, record) => {
              getRoomUtilsByRoomTypeID(positionUser, record.room_type_id.id)
                .then(({ data }) => {
                  setRooms((prev) => {
                    return prev.map((room) => {
                      if (record.id === room.id) {
                        return { ...room, utils: data };
                      }
                      return room;
                    });
                  });
                })
                .catch((error) => {
                  console.log(error);
                  ErrorAlert("Lấy dữ liệu tiện ích của loại phòng thất bại!!");
                });
            },
          }}
        ></Table>
      </Form>
      <BottomBar>
        <Button type="primary" onClick={openModalInfoCustomer}>
          Đặt
        </Button>
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
