import React, { useEffect, useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, Select, Tag } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import RoomForm from "../../../../components/Form/RoomForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import WarningModal from "../../../../components/WarningModal/WarningModal";
import { getAllRoomType } from "../../../../api/RoomTypeAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { createRoom, hideRoom, updateRoom } from "../../../../api/RoomAPI";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";

const RoomsTable = ({ rooms, setRoom, positionUser, listType = [] }) => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [modal, setModal] = useState("");

  const [roomTypes, setRoomTypes] = useState([]);

  const [filter, setFilter] = useState("");

  const items = listType.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

  useEffect(() => {
    getAllRoomType(positionUser)
      .then(({ data }) => {
        setRoomTypes(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy dữ liệu loại phòng thất bại!!");
      });
  }, [positionUser]);

  const columns = [
    {
      key: "1",
      title: "ID",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      sorter: (a, b) => a.room_name.localeCompare(b.room_name),
      dataIndex: "id",
      width: "10%",
      align: "center",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "2",
      title: "Tên phòng",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.room_name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.roomType)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      sorter: (a, b) => a.room_name.localeCompare(b.room_name),
      dataIndex: "room_name",
      width: "25%",
      align: "center",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "3",
      title: "Loại phòng",
      dataIndex: "room_type_id",
      width: "30%",
      align: "center",
      filteredValue: filter !== "" ? [filter] : null,
      render: (text, record) => {
        return <p>{record.room_type_id.name}</p>;
      },
      filterDropdown: ({ confirm, clearFilters }) => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  style={{ width: 300 }}
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn loại phòng"
                  onChange={(e) => {
                    setFilter(e);
                    confirm();
                  }}
                />
              </div>
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  console.log(rooms);
                  setFilter("");
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
        if (filter === "") {
          return record.roomType;
        } else {
          return record.roomType === value;
        }
        // record.roomType === value;
        // console.log(value);
      },
      // onFilter: (value, record) => {
      //   console.log("1");
      //   return record.roomType
      //     .toLocaleLowerCase()
      //     .includes(value.toLocaleLowerCase());
      // },
    },
    {
      key: "3",
      title: "Trạng thái",
      dataIndex: "status",
      width: "20%",
      align: "center",
      render: (text, record) => {
        switch (text) {
          case "0":
            return (
              <Tag color="success" style={{ fontSize: 14 }}>
                Trống
              </Tag>
            );
          case "1":
            return (
              <Tag color="error" style={{ fontSize: 14 }}>
                Đang sử dụng
              </Tag>
            );
          case "2":
            return (
              <Tag color="processing" style={{ fontSize: 14 }}>
                Đang dọn dẹp
              </Tag>
            );
          default:
            return (
              <Tag style={{ fontSize: 14 }} color="#8A2BE2">
                Trạng thái lỗi!!
              </Tag>
            );
        }
      },
    },
    {
      key: "4",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <>
                <EditButton
                  onEditButton={() => {
                    console.log(record);
                    setEditingRow(record.id);
                    setModal("edit");
                    form.setFieldsValue({
                      room_name: record.room_name,
                      room_type_id: record.room_type_id.id,
                    });
                  }}
                ></EditButton>
                <DeleteButton
                  onDeleteButton={() => onDeleteButton(record)}
                ></DeleteButton>
              </>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="table">
      {modal === "add" && openModalAdd()}
      {modal === "edit" && openModalEdit()}
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
            onClick={() => {
              setModal("add");
              form.setFieldValue("room_type_id", roomTypes[0].id || 2);
            }}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Table
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={rooms}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );

  function onDeleteButton(record) {
    WarningModal("Bạn có chắc muốn xóa phòng này không?", deleteOK, record);
  }

  function deleteOK(record) {
    hideRoom(positionUser, record.id)
      .then((res) => {
        SuccessAlert("Xóa phòng thành công.");
        setRoom((prev) => prev.filter((util) => util.id !== record.id));
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Xóa phòng không thành công!!");
      });
  }

  function openModalAdd() {
    return (
      <Modal
        title="Thêm phòng"
        open={true}
        onOk={handleOkModalAdd}
        onCancel={onCancelButton}
        width="50%"
      >
        <RoomForm
          form={form}
          options={createOptionsArr(roomTypes)}
          positionUser={positionUser}
          rooms={rooms}
        ></RoomForm>
      </Modal>
    );
  }
  function openModalEdit() {
    return (
      <Modal
        title="Chỉnh sửa thông tin phòng"
        open={true}
        onOk={handleOkModalEdit}
        onCancel={onCancelButton}
        width="50%"
      >
        <RoomForm
          form={form}
          options={createOptionsArr(roomTypes)}
          positionUser={positionUser}
          rooms={rooms}
          editing={true}
        ></RoomForm>
      </Modal>
    );
  }

  function handleOkModalEdit() {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        updateRoom(positionUser, editingRow, values)
          .then(({ data }) => {
            SuccessAlert("Chỉnh sửa phòng thành công.");
            setRoom((prev) =>
              prev.map((room) => {
                if (room.id == editingRow) return { ...data };
                return room;
              })
            );
            resetValue();
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Chỉnh sửa phòng thất bại!!");
          });
      })
      .catch((err) => console.log(err));
  }

  function handleOkModalAdd() {
    form
      .validateFields()
      .then((values) => {
        createRoom(positionUser, values)
          .then(({ data }) => {
            console.log(data);
            setRoom((prev) => [...prev, data]);
            SuccessAlert("Tạo phòng thành công.");
            resetValue();
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Tạo phòng thất bại!!");
          });
      })
      .catch((err) => console.log(err));
  }

  function onCancelButton() {
    resetValue();
  }

  function resetValue() {
    form.resetFields();
    setModal(false);
  }

  function createOptionsArr(roomtypes = []) {
    return roomtypes.map((roomType) => ({
      value: roomType.id,
      label: roomType.name,
    }));
  }
};

export default RoomsTable;
