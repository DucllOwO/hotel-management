import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UtilitiesForm from "../../../../components/Form/UtilitiesForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import CheckButton from "../../../../components/IconButton/CheckButton/CheckButton";
import CancelButton from "../../../../components/IconButton/CancelButton/CancelButton";
import WarningModal from "../../../../components/WarningModal/WarningModal";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import {
  createRoomFeatures,
  deleteRoomFeature,
  updateRoomFeatures,
} from "../../../../api/RoomFeatureAPI";

const UtilitiesTable = ({
  utilities,
  setUtilities,
  positionUser,
  isLoading,
}) => {
  const [isModalVisible, setIsModalVisible] = useState("");

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "15%",
      align: "center",
    },
    {
      key: "2",
      title: "Tên tiện ích",
      filteredValue: [searchedText],
      width: "65%",
      align: "center",
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.id)
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên của tiện ích",
                },
              ]}
              style={{ width: "30%", margin: "auto" }}
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
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              {editingRow === record.id ? (
                <>
                  <CheckButton onCheckButton={() => onCheckButton(record)} />
                  <CancelButton onCancelButton={onCancelButton} />
                </>
              ) : (
                <>
                  <EditButton
                    onEditButton={() => {
                      if (!editingRow) {
                        console.log(record);
                        setEditingRow(record.id);
                        form.setFieldValue("name", record.name);
                      } else {
                        onCancelButton();
                        setEditingRow(null);
                      }
                    }}
                  ></EditButton>
                  <DeleteButton
                    onDeleteButton={() => onDeleteButton(record)}
                  ></DeleteButton>
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  const onCheckButton = (util) => {
    form
      .validateFields()
      .then((values) => {
        updateRoomFeatures(positionUser, util.id, values.name)
          .then(({ data }) => {
            SuccessAlert("Chỉnh sửa tiện ích thành công.");
            setUtilities((prev) =>
              prev.map((roomType) => {
                if (roomType.id == util.id) return { ...data };
                return roomType;
              })
            );
            resetValue();
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Chỉnh sửa tiện ích thất bại!!");
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="table">
      <>{isModalVisible === "add" ? <ModalAddUtil /> : null}</>
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
            onClick={() => showModalAdd()}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Form form={form}>
        <Table
          loading={isLoading}
          rowKey={(row) => row.id}
          showSorterTooltip={false}
          columns={columns}
          dataSource={utilities}
          scroll={{ y: "60vh", x: "100%" }}
        ></Table>
      </Form>
    </div>
  );

  function ModalAddUtil() {
    return (
      <Modal
        title="Thông tin tiện ích"
        open={true}
        onOk={handleOkModalAdd}
        onCancel={handleCancelModal}
        width="50%"
      >
        <UtilitiesForm form={form} />
      </Modal>
    );
  }

  function onCancelButton(record) {
    WarningModal("Bạn có chắc muốn hủy chỉnh sửa?", cancelOK);
  }

  function cancelOK() {
    setEditingRow(null);
  }

  function onDeleteButton(record) {
    WarningModal("Bạn có chắc muốn xóa tiện ích?", deleteOKButton, record);
  }

  function deleteOKButton(record) {
    deleteRoomFeature(positionUser, record.id)
      .then((res) => {
        SuccessAlert("Xóa tiện ích thành công.");
        setUtilities((prev) => prev.filter((util) => util.id !== record.id));
        resetValue();
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Xóa tiện ích thất bại!!");
      });
  }

  function handleOkModalAdd() {
    form
      .validateFields()
      .then((values) => {
        createRoomFeatures(positionUser, values.name).then(({ data }) => {
          setUtilities((prev) => [...prev, data]);
          SuccessAlert("Tạo tiện ích thành công ");
          resetValue();
        });
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Tạo tiện ích không thành công!!");
      });
  }

  function resetValue() {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRow(null);
  }
  function handleCancelModal() {
    resetValue();
  }

  function showModalAdd() {
    setIsModalVisible("add");
  }
};

export default UtilitiesTable;
