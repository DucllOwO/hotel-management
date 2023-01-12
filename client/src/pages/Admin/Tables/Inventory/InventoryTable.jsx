import React, { useState } from "react";
import dayjs from "dayjs";
import { Table, Button, Modal, Form, Input, Slider, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import InventoryForm from "../../../../components/Form/InventoryForm";
import { fetchEmployeeByUsername } from "../../../../api/EmployeeAPI";
import CheckButton from "../../../../components/IconButton/CheckButton/CheckButton";
import { useContext } from "react";
import { ItemContext } from "../../../../context/ItemContext";
import {
  createInventoryDetail,
  createInventoryRecord,
  fetchInventoryDetailByBookingID,
  fetchInventoryDetailByBookingID_RoomID,
} from "../../../../api/InventoryAPI";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import InventoryExpand from "../../../../components/ExpandedTable/InventoryExpand";

const InventoryTable = ({
  rooms,
  setRooms,
  user,
  isLoading,
  roomType,
  positionUser,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const [form] = Form.useForm();
  const { item, setItem, record, setRecord } = useContext(ItemContext);
  const [selectedRoom, setSelectedRoom] = useState({});

  const [searchedText, setSearchedText] = useState("");
  const areaMark = {
    10: "10",
    60: "60",
  };

  const items = roomType.map((item) => {
    return {
      label: item.name.toString(),
      value: item.name.toString(),
    };
  });

  const [filter, setFilter] = useState("");

  const columns = [
    {
      key: "1",
      title: "Tên phòng",
      dataIndex: "room_name",
      width: "26.6666%",
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
          String(record.room_type)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType.name)
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
      // render: (_,record) => {}
    },
    {
      key: "2",
      title: "Loại phòng",
      dataIndex: "room_type",
      width: "26.6666%",
      align: "center",
      filteredValue: filter !== "" ? [filter] : null,

      // render: (text, record) => {
      //   // return <p>{record.room_type_id.name}</p>;
      // },
      filterDropdown: ({ confirm, clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn loại phòng"
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
        return <FilterOutlined />;
      },
      onFilter: (value, record) => {
        if (filter === "") {
          return record.room_type;
        } else {
          return record.room_type === value;
        }
        // record.roomType === value;
        // console.log(value);
      },
    },
    {
      key: "3",
      title: "Diện tích (m2)",
      dataIndex: "area",
      width: "26.6666%",
      align: "center",
      // render: (text, record) => {
      //   // return <p>{text}</p>;
      // },
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                max={60}
                min={10}
                marks={areaMark}
                defaultValue={[10, 20]}
                onChange={(value) => {}}
              />
              <Button type="primary" onClick={() => {}}>
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "4",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <CheckButton
              title="Kiểm tra phòng"
              onCheckButton={() => {
                showModal();
                console.log(record);
                setSelectedRoom(record);
                // form.setFieldValue("room_name", record.room_name);
              }}
            ></CheckButton>
            {/* <TextButton
              title="Kiểm tra phòng"
              onHandleTextButton={() => {
                showModal();
                form.setFieldValue("room_name", record.room_name);
              }}
            ></TextButton> */}
            {/* <Button
              onClick={() => {
                
              }}
            >
              Kiểm tra phòng
            </Button> */}
          </>
        );
      },
    },
  ];

  function handleOKModalAdd() {
    fetchEmployeeByUsername(user?.position, user?.account.username).then(
      ({ data }) => {
        console.log(data);
        const newRecord = {
          date: dayjs(Date.now()),
          employee_id: data.id,
          booking_id: selectedRoom.booking_id,
          room_id: selectedRoom.room_id,
        };
        createInventoryRecord(user?.position, newRecord)
          .then((value) => {
            console.log(value);
            record.forEach((item) => {
              const detailCost = item.price * item.amount;
              const newDetail = {
                item_id: item.id,
                price: item.price,
                amount: item.amount,
                cost: detailCost,
                record_id: value.data[0].id,
              };
              createInventoryDetail(user?.position, newDetail)
                .then(() => {})
                .catch((error) => {
                  ErrorAlert("Đã xảy ra lỗi");
                  throw error;
                });
            });
            SuccessAlert("Kiểm phòng hoàn tất");
          })
          .catch((error) => {
            ErrorAlert("Đã xảy ra lỗi");
            throw error;
          });
      }
    );
    setIsModalVisible(false);
    form.resetFields();
    setRecord([]);
  }
  function handleCancelModal() {
    setIsModalVisible(false);
    setRecord([]);
    form.resetFields();
  }

  const modalForm = () => {
    return (
      <Modal
        title="Nhập số lượng sản phẩm sử dụng"
        open={true}
        onOk={handleOKModalAdd}
        onCancel={handleCancelModal}
        width="50%"
      >
        <InventoryForm
          form={form}
          record={record}
          setRecord={setRecord}
          room_name={selectedRoom.room_name}
        />
      </Modal>
    );
  };

  return (
    <div className="table">
      <>{isModalVisible ? modalForm() : null}</>
      <div className="buttonContainer">
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
        rowKey={(record) => record.used_room_id}
        loading={isLoading}
        showSorterTooltip={false}
        columns={columns}
        dataSource={rooms}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <InventoryExpand
                inventoryDetail={record.inventoryDetails}
              ></InventoryExpand>
            );
          },
          onExpand: (expanded, record) => {
            if (expanded)
              fetchInventoryDetailByBookingID_RoomID(
                positionUser,
                record.booking_id,
                record.room_id
              ).then(({ data }) => {
                setRooms((prev) => {
                  return prev.map((invenRecord) => {
                    if (
                      record.booking_id === invenRecord.booking_id &&
                      record.room_id === invenRecord.room_id
                    ) {
                      return { ...invenRecord, inventoryDetails: data };
                    }
                    return invenRecord;
                  });
                });
              });
          },
        }}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default InventoryTable;
