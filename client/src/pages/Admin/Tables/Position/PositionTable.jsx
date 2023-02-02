import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { PositionContext } from "../../../../context/PositionContext";
import PositionForm from "../../../../components/Form/PositionForm";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import {
  addPosition,
  deletePosition,
  fetchPositionByID,
  updatePosition,
} from "../../../../api/PositionAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import FeatureTable from "../Function/FeatureTable";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const INITIAL_STATE_CUR_EXPAND_POSITION = {
  loading: false,
  features: [],
};

const PositionTable = ({ positions, setPositions }) => {
  const { user } = useContext(AppContext);
  const [form] = Form.useForm();
  const { features, setIsFeaturesError } = useContext(PositionContext);
  const [modal, setModal] = useState("");
  const [currentPosition, setCurrentPosition] = useState({});
  const [oldFeaturesState, setOldFeaturesState] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [currentExpandPosition, setCurrenExpandPosition] = useState(
    INITIAL_STATE_CUR_EXPAND_POSITION
  );

  const [searchedText, setSearchedText] = useState("");
  const showModalAdd = (e) => {
    setModal("add");
  };
  const handleOKModalAdd = () => {
    form.validateFields().then((values) => {
      const featuresChecked = createFeaturesCheckedArray(features);
      console.log(featuresChecked);
      if (featuresChecked.length > 0)
        onCreatePosition(values.posName, featuresChecked);
      else setIsFeaturesError("Vui lòng chọn ít nhất 1 chức năng!!");
    });
  };
  const handleOKModalEdit = () => {
    form.validateFields().then((values) => {
      console.log(values);
      const {
        featuresAdded: featuresChecked,
        featuresRemoved: featuresUnChecked,
      } = createFeaturesResultArray(oldFeaturesState, features);
      if (featuresChecked?.length > 0 || featuresUnChecked?.length > 0) {
        onUpdatePosition(values, featuresChecked, featuresUnChecked);
      } else
        setIsFeaturesError(
          `Bạn chưa chọn chức năng nào, vui lòng chọn ít nhất 1 chức năng!!`
        );
    });
  };

  const onUpdatePosition = (values, featuresChecked, featuresUnCheck) => {
    setIsFeaturesError(null);
    updatePosition(
      user?.position,
      values.posName,
      currentPosition.id,
      featuresChecked,
      featuresUnCheck
    )
      .then(({ data }) => {
        SuccessAlert("Thay đổi chức vụ thành công.");
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Thay đổi chức vụ không thành công!!");
      });
    setModal(null);
    form.resetFields();
  };

  const onCreatePosition = (posName, features) => {
    setIsFeaturesError(null);

    addPosition(user?.position, posName, features)
      .then(({ data }) => {
        setPositions((prevPos) => [...prevPos, data]);
        SuccessAlert("Tạo chức vụ thành công.");
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Tạo chức vụ không thành công!!");
      });

    setModal(null);
    form.resetFields();
    SuccessAlert("Tạo chức vụ thành công.");
  };

  const handleCancelModal = () => {
    setModal(null);
    setIsFeaturesError(null);
    form.resetFields();
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Có",
      okType: "danger",
      onOk: () => {
        deletePosition(user?.position, record?.id).then(({ data }) => {
          SuccessAlert("Xoá chức vụ thành công.");
          setPositions((pre) => {
            return pre.filter((data) => data.id !== record?.id);
          }).catch((err) => {
            console.log(err);
            ErrorAlert("Xoá chức vụ không thành công.");
          });
        });
      },
    });
  };

  const modalAddPosition = () => (
    <Modal
      title="Thông tin chức vụ"
      open={true}
      onOk={handleOKModalAdd}
      onCancel={handleCancelModal}
      width="60%"
    >
      <PositionForm form={form} />
    </Modal>
  );

  const modalEditPosition = (position) => {
    return (
      <Modal
        title="Thông tin chức vụ"
        open={true}
        onOk={handleOKModalEdit}
        onCancel={handleCancelModal}
        width="60%"
      >
        <PositionForm
          form={form}
          positionID={position.id}
          setOldFeaturesState={setOldFeaturesState}
        />
      </Modal>
    );
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      colSpan: 1,
      dataIndex: "id",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Tên chức vụ",
      width: "60%",
      align: "center",
      filteredValue: [searchedText],
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
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "3",
      title: "Thao tác",
      width: "30%",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton
                onEditButton={() => {
                  setModal("edit");
                  form.setFieldValue("posName", record.name);
                  setCurrentPosition(record);
                }}
              ></EditButton>
              <DeleteButton
                onDeleteButton={(e) => onDeleteButton(record)}
              ></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="table">
      <>
        {modal === "add" ? modalAddPosition() : null}
        {modal === "edit" ? modalEditPosition(currentPosition) : null}
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
            onClick={showModalAdd}
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
        showSorterTooltip={false}
        columns={columns}
        dataSource={positions}
        scroll={{ y: "60vh", x: "100%" }}
        loading={positions ? false : true}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (_) => {
            return (
              <FeatureTable
                features={currentExpandPosition.features}
                readOnly={true}
                loading={currentExpandPosition.loading}
              />
            );
          },
        }}
        expandedRowKeys={expandedRowKeys}
        onExpand={onTableRowExpand}
        pagination={false}
      ></Table>
    </div>
  );

  function onTableRowExpand(expanded, record) {
    const keys = [];
    if (expanded) {
      keys.push(record.id);
    }

    setExpandedRowKeys(keys);

    if (!currentExpandPosition.loading) {
      setCurrenExpandPosition((prev) => ({ ...prev, loading: true }));
      fetchPositionByID(user.position, record.id)
        .then(({ data }) => {
          setCurrenExpandPosition((prev) => {
            return { loading: false, features: data };
          });
        })
        .catch((err) => {
          console.log(err);
          ErrorAlert(`Lấy dữ liệu quyền của ${record.name} thất bại!!`);
          setCurrenExpandPosition((prev) => ({ ...prev, loading: false }));
        });
    }
  }
};

const createFeaturesCheckedArray = (featureCheckboxs) => {
  let tempArr = [];
  //console.log(featureCheckboxs);
  featureCheckboxs.forEach((feature, index) => {
    if (feature?.read?.isCheck) tempArr.push(feature.read);

    if (feature?.create?.isCheck) tempArr.push(feature.create);

    if (feature?.update?.isCheck) tempArr.push(feature.update);

    if (feature?.delete?.isCheck) tempArr.push(feature.delete);
  });
  return tempArr;
};

const createFeaturesResultArray = (oldFeaturesState, currentFeaturesState) => {
  let featuresAdded = [],
    featuresRemoved = [];
  oldFeaturesState.forEach((oldFeature, index) => {
    checkFeatures(
      "read",
      oldFeature,
      currentFeaturesState,
      featuresAdded,
      featuresRemoved,
      index
    );

    checkFeatures(
      "create",
      oldFeature,
      currentFeaturesState,
      featuresAdded,
      featuresRemoved,
      index
    );

    checkFeatures(
      "update",
      oldFeature,
      currentFeaturesState,
      featuresAdded,
      featuresRemoved,
      index
    );

    checkFeatures(
      "delete",
      oldFeature,
      currentFeaturesState,
      featuresAdded,
      featuresRemoved,
      index
    );
  });
  console.log({ featuresAdded, featuresRemoved });
  return { featuresAdded, featuresRemoved };
};
// check features check or uncheck base on action
const checkFeatures = (
  action,
  oldFeature,
  currentFeaturesState,
  featuresAdded,
  featuresRemoved,
  index
) => {
  if (
    oldFeature[action]?.isCheck === false &&
    currentFeaturesState[index][action]?.isCheck === true
  ) {
    featuresAdded.push(currentFeaturesState[index][action]);
  }
  if (
    oldFeature[action]?.isCheck === true &&
    currentFeaturesState[index][action]?.isCheck === false
  ) {
    featuresRemoved.push(currentFeaturesState[index][action]);
  }
};

export default PositionTable;
