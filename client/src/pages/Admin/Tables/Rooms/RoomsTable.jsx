import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RoomsTable = ({ rooms, setRoom }) => {
  const navigate = useNavigate();

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "Tên phòng",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.name)
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
    },
    {
      key: "3",
      title: "Diện tích",
      dataIndex: "size",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="area"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập diện tích",
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
      key: "4",
      title: "Giá",
      dataIndex: "price",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá",
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
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        if (editingRow !== null) {
          if (editingRow === record.idNum) {
            return (
              <>
                <Button
                  htmlType="submit"
                  // onClick={() => {form.submit()}}
                >
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    setEditingRow(null);
                  }}
                >
                  Huỷ
                </Button>
              </>
            );
          } else {
          }
        } else {
          return (
            <>
              <Button
              // onClick={(e) => {
              //   e.preventDefault();
              //   setEditingRow(record.idNum);
              //   form.setFieldsValue({
              //     name: record.name,
              //     roomType: record.roomType,
              //     area: record.area,
              //     price: record.price,
              //   });
              // }}
              >
                Chỉnh sửa
              </Button>
              <Button
                onClick={() => {
                  onDeleteButton(record);
                }}
              >
                Xoá
              </Button>
            </>
          );
        }
      },
    },
  ];

  const onAddButton = () => {
    navigate("/admin/addroom");
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
            onClick={onAddButton}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table columns={columns} dataSource={rooms} scroll={{ y: 350 }}></Table>
      </Form>
    </div>
  );
};

export default RoomsTable;
