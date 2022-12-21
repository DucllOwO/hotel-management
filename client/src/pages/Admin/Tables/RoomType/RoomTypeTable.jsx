import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RoomTypeForm from "../../../../components/Form/RoomTypeForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import RoomTypeExpand from "../../../../components/ExpandedTable/RoomTypeExpand";
import { getRoomUtilsByRoomTypeID } from "../../../../api/RoomTypeAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const RoomTypeTable = ({ roomTypes, setRoomTypes, positionUser }) => {
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
      width: "10vw",
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
        return <p>{text}</p>;
      },
    },
    {
      key: "3",
      title: "Số lượng khách",
      dataIndex: "max_customers",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "4",
      title: "Số giường",
      dataIndex: "bed_amount",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "5",
      title: "Diện tích (m2)",
      dataIndex: "area",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "7",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton openModalEdit={() => {}}></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "OK",
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
          open={isModalVisible}
          onOk={handle}
          onCancel={handle}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <RoomTypeForm></RoomTypeForm>
        </Modal>
      </>
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
          scroll={{ y: "70vh" }}
          rowKey={(row) => row.id}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <RoomTypeExpand
                  utils={record.utils}
                  firstHourPrice={record.first_hour_price}
                  overNightPrice={record.overnight_price}
                  oneDayPrice={record.one_day_price}
                  hourPrice={record.hour_price}
                />
              );
            },
            onExpand: (expanded, record) => {
              getRoomUtilsByRoomTypeID(positionUser, record.id)
                .then(({ data }) => {
                  setRoomTypes((prev) => {
                    return prev.map((roomType) => {
                      if (record.name === roomType.name) {
                        return { ...roomType, utils: data };
                      }
                      return roomType;
                    });
                  });
                })
                .catch((error) => {
                  console.log(error);
                  ErrorAlert("Lấy dữ liệu tiện ích của loại phòng thất bại!!");
                });
            },
          }}
          pagination={false}
        ></Table>
      </Form>
    </div>
  );
};

export default RoomTypeTable;
