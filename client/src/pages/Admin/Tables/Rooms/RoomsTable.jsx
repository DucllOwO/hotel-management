import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddRoomForm from "../../../../components/Form/AddRoomForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const RoomsTable = ({ rooms, setRoom }) => {
  const navigate = useNavigate();

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [modal, setModal] = useState(false);

  const items = [
    {
      label: "Loại 1",
      key: "1",
    },
    {
      label: "Luxury",
      key: "2",
    },
    {
      label: "President",
      key: "3",
    },
  ];

  const columns = [
    {
      key: "1",
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
      width: "40%",
      align: "center",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên phòng",
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
      key: "2",
      title: "Loại phòng",
      dataIndex: "roomType",
      width: "40%",
      align: "center",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="roomType"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại phòng",
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
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <div>
                <Select
                  size="medium"
                  options={items}
                  showSearch
                  placeholder="Chọn loại phòng"
                  onChange={(e) => {}}
                />
              </div>
              <Button type="primary" style={{ marginTop: "10px" }}>
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
    // {
    //   key: "3",
    //   title: "Diện tích",
    //   dataIndex: "size",
    //   render: (text, record) => {
    //     if (editingRow === record.idNum) {
    //       return (
    //         <Form.Item
    //           name="area"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Vui lòng nhập diện tích",
    //             },
    //           ]}
    //         >
    //           <Input />
    //         </Form.Item>
    //       );
    //     } else {
    //       return <p>{text}</p>;
    //     }
    //   },
    // },
    {
      key: "3",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton openModalEdit={openModalEdit}></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const openModalEdit = () => {
    return (
      <Modal
        title="Thêm phòng"
        open={true}
        onOk={() => {
          setModal(false);
        }}
        onCancel={() => {
          setModal(false);
        }}
        width="40%"
      >
        <AddRoomForm></AddRoomForm>
      </Modal>
    );
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setRoom((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...rooms];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setRoom(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      {modal === true && openModalEdit()}
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
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
              setModal(true);
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
        columns={columns}
        dataSource={rooms}
        scroll={{ y: "60vh", x: "100%" }}
      ></Table>
    </div>
  );
};

export default RoomsTable;
