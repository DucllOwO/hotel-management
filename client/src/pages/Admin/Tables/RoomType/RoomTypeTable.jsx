import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import RoomTypeModal from "../../Modals/RoomType/RoomTypeModal";

const RoomTypeTable = ({ roomTypes, setRoomTypes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handle = () => {
    setIsModalVisible(false);
  };

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Tên loại phòng",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.max_customers)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.bed_amount)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the name",
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
      title: "Số lượng khách",
      dataIndex: "max_customers",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the amount",
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
      title: "Số giường",
      dataIndex: "bed_amount",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the amount",
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

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setRoomTypes((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...roomTypes];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setRoomTypes(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      <>
        <Modal
          title="Thông tin loại phòng"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
        >
          <RoomTypeModal></RoomTypeModal>
        </Modal>
      </>
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
            onClick={showModal}
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
        <Table
          columns={columns}
          dataSource={roomTypes}
          scroll={{ y: 350 }}
          rowKey={(row) => row.id}
        ></Table>
      </Form>
    </div>
  );
};

export default RoomTypeTable;
