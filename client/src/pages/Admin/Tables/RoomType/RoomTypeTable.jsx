import React, { useState } from "react";
import "../index.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Slider,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import RoomTypeForm from "../../../../components/Form/RoomTypeForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";
import RoomTypeExpand from "../../../../components/ExpandedTable/RoomTypeExpand";
import {
  createRoomType,
  hideRoomType,
  updateRoomType,
} from "../../../../api/RoomTypeAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import LocalStorage from "../../../../Utils/localStorage";
import {
  createRoomFeaturesByRoomTypeID,
  getRoomUtilsByRoomTypeID,
  updateRoomFeaturesByRoomTypeID,
} from "../../../../api/hasRoomFeatures";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";

const RoomTypeTable = ({ roomTypes, setRoomTypes, positionUser }) => {
  const [isModalVisible, setIsModalVisible] = useState();

  const [roomUtils, setRoomUtils] = useState(
    createUtilsCheckArr(LocalStorage.getItem("utils") || [])
  );

  const [oldRoomUtils, setOldRoomUtils] = useState([]);

  const [isUtilEmpty, setIsUtilEmpty] = useState(false);

  const [currentSelectedID, setCurrentSelectedID] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const maxCustomerMark = {
    1: "1",
    10: "10",
  };
  const bedAmountMark = {
    1: "1",
    5: "5",
  };
  const areaMark = {
    10: "10",
    60: "60",
  };

  const priceMark = {
    100000: "100,000đ",
    10000000: "10,000,000đ",
  };

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
      title: "ID",
      dataIndex: "id",
      width: "5%",
      align: "center",
    },
    {
      key: "2",
      title: "Tên loại phòng",
      filteredValue: [searchedText],
      align: "center",
      onFilter: (value, record) => {
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      dataIndex: "name",
      render: (text, record) => {
        return <p>{text}</p>;
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
    {
      key: "3",
      title: "Số lượng khách",
      dataIndex: "max_customers",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return <p>{text}</p>;
      },
      sorter: (a, b) => a.max_customers - b.max_customers,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                formatter={(value) => value.toString().replace(".", ",")}
                parser={(input) => input.replace(/[^\w\,-]+/g, "")}
                range
                max={10}
                min={1}
                defaultValue={[1, 4]}
                marks={maxCustomerMark}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
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
      title: "Số giường",
      dataIndex: "bed_amount",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return <p>{text}</p>;
      },
      sorter: (a, b) => a.bed_amount - b.bed_amount,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                defaultValue={[1, 2]}
                max={5}
                min={1}
                marks={bedAmountMark}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "5",
      title: "Diện tích (m2)",
      dataIndex: "area",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return <p>{text}</p>;
      },
      sorter: (a, b) => a.area - b.area,
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
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },

    {
      key: "6",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton
                openModalEdit={() => onOpenModalEdit(record)}
              ></EditButton>
              <DeleteButton
                onDeleteButton={() => onDeleteButton(record)}
              ></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const onOpenModalEdit = (record) => {
    setIsModalVisible("edit");
    setCurrentSelectedID(record.id);
    form.setFieldsValue({ ...record });
    getRoomUtilsByRoomTypeID(positionUser, record.id)
      .then(({ data }) => {
        const tempUtilArr = createUtilsCheckEditArr(
          LocalStorage.getItem("utils"),
          data
        );
        setRoomUtils(tempUtilArr);
        setOldRoomUtils(tempUtilArr);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("Lấy dữ liệu tiện ích của loại phòng thất bại!!");
      });
  };

  const handleOkModalAdd = () => {
    if (checkUtilArrEmpty(roomUtils)) {
      form
        .validateFields()
        .then((values) => {
          createRoomType(positionUser, values)
            .then(({ data }) => {
              setRoomTypes((prev) => [...prev, data]);
              createRoomFeaturesByRoomTypeID(
                positionUser,
                data.id,
                getCheckUtil(roomUtils)
              )
                .then((res) => {
                  SuccessAlert("Tạo loại phòng thành công");
                  resetAllValue();
                })
                .catch((err) => {
                  console.log(err);
                  ErrorAlert("Tạo tiện ích cho loại phòng thất bại!");
                });
            })
            .catch((error) => {
              console.log(error);
              ErrorAlert("Tạo loại phòng thất bại!!");
            });
        })
        .catch((error) => console.log(error));
    } else setIsUtilEmpty(true);
  };

  const modalEdit = () => {
    return (
      <Modal
        title="Chỉnh sửa thông tin loại phòng"
        open={true}
        onOk={handleOkModalEdit}
        onCancel={handleCancelModal}
        okText="Xác nhận"
        cancelText="Hủy"
        width="50vw"
      >
        <RoomTypeForm
          form={form}
          utils={roomUtils}
          setUtils={setRoomUtils}
          isUtilEmpty={isUtilEmpty}
        ></RoomTypeForm>
      </Modal>
    );
  };

  const handleOkModalEdit = () => {
    if (checkUtilArrEmpty(roomUtils)) {
      form
        .validateFields()
        .then((values) => {
          updateRoomType(positionUser, currentSelectedID, values)
            .then(({ data }) => {
              // filter old roomtype with new ones
              const [checkUtils, unCheckUtils] = compareUtilCheckArray(
                roomUtils,
                oldRoomUtils
              );
              updateRoomFeaturesByRoomTypeID(
                positionUser,
                currentSelectedID,
                checkUtils,
                unCheckUtils
              )
                .then((res) => {
                  SuccessAlert("Cập nhật loại phòng thành công");
                  resetAllValue();
                })
                .catch((err) => {
                  ErrorAlert(
                    "Cập nhật dữ liệu tiện ích của loại phòng thất bại!!"
                  );
                });
              setRoomTypes((prev) =>
                prev.map((roomType) => {
                  if (roomType.id == currentSelectedID) return { ...data };
                  return roomType;
                })
              );
            })
            .catch((err) => {
              console.log(err);
              ErrorAlert("Cập nhật dữ liệu loại phòng thất bại!!");
            });
        })
        .catch((error) => console.log(error));
    } else setIsUtilEmpty(true);
  };

  const modalAdd = () => {
    return (
      <Modal
        title="Tạo mới loại phòng"
        open={true}
        onOk={handleOkModalAdd}
        onCancel={handleCancelModal}
        okText="Xác nhận"
        cancelText="Hủy"
        width="50vw"
      >
        <RoomTypeForm
          form={form}
          utils={roomUtils}
          setUtils={setRoomUtils}
          isUtilEmpty={isUtilEmpty}
        ></RoomTypeForm>
      </Modal>
    );
  };

  return (
    <div className="table">
      <>
        {isModalVisible === "add" ? modalAdd() : null}
        {isModalVisible === "edit" ? modalEdit() : null}
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
            onClick={(e) => showModalAdd()}
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
        dataSource={roomTypes}
        scroll={{ y: "60vh", x: "100%" }}
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
    </div>
  );

  function getCheckUtil(utils) {
    return utils.filter((util) => util.checked === true);
  }

  // check to ensure util array has at least 1 util is check
  function checkUtilArrEmpty(roomUtils) {
    let hasCheck = false;
    for (const util of roomUtils) {
      if (util.checked) {
        setIsUtilEmpty(false);
        hasCheck = true;
        break;
      }
    }
    return hasCheck;
  }

  function onDeleteButton(record) {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "OK",
      okType: "danger",
      onOk: () => {
        hideRoomType(positionUser, record.id)
          .then((res) => {
            setRoomTypes((pre) => {
              return pre.filter((data) => data.id !== record.id);
            });
            SuccessAlert("Xóa thông tin loại phòng thành công.");
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Xóa thông tin loại phòng thất bại!!");
          });
      },
    });
  }

  function handleCancelModal() {
    resetAllValue();
  }

  function resetAllValue() {
    setIsModalVisible(false);
    form.resetFields();
    setRoomUtils(createUtilsCheckArr(LocalStorage.getItem("utils")));
    setOldRoomUtils([]);
    setCurrentSelectedID(null);
  }

  function showModalAdd() {
    setIsModalVisible("add");
  }
};

function createUtilsCheckArr(utils = []) {
  return utils.map((util) => {
    return { ...util, checked: false };
  });
}
function createUtilsCheckEditArr(utilsDefault = [], utilsOfRoom = []) {
  return utilsDefault.map((util) => {
    const index = utilsOfRoom.findIndex(
      (utilOfRoom) => utilOfRoom.room_feature.id === util.id
    );

    if (index >= 0) return { ...util, checked: true };
    else return { ...util, checked: false };
  });
}

function compareUtilCheckArray(utils, oldUtils) {
  let checkArr = [];
  let unCheckArr = [];

  utils.forEach((util, index) => {
    if (util.checked === true && oldUtils[index].checked === false)
      checkArr.push(util);
    if (util.checked === false && oldUtils[index].checked === true)
      unCheckArr.push(util);
  });

  return [checkArr, unCheckArr];
}

export default RoomTypeTable;
