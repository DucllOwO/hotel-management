import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Input, Form } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { PositionContext } from "../../../../context/PositionContext";
import PositionForm from "../../../../components/Form/PositionForm";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import {
  addPosition,
  deletePosition,
  updatePosition,
} from "../../../../api/PositionAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const PositionTable = ({ positions, setPositions }) => {
  const { user } = useContext(AppContext);
  const [form] = Form.useForm();
  const { features, setIsFeaturesError } = useContext(PositionContext);
  const [modal, setModal] = useState("");
  const [currentPosition, setCurrentPosition] = useState({});
  const [oldFeaturesState, setOldFeaturesState] = useState([]);

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
      else setIsFeaturesError("Please choose at least 1 feature!!");
    });
  };
  const handleOKModalEdit = () => {
    console.log("handleOKModalEdit");
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
          `Feature doesn't updates, please updates features!!`
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
        SuccessAlert("Update position success.");
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Update position error!!");
      });
    setModal(null);
    form.resetFields();
  };

  const onCreatePosition = (posName, features) => {
    setIsFeaturesError(null);

    addPosition(user?.position, posName, features)
      .then(({ data }) => {
        setPositions((prevPos) => [...prevPos, data]);
        SuccessAlert("Create position success.");
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Create position error!!");
      });

    setModal(null);
    form.resetFields();
    SuccessAlert("Create position success.");
  };

  const handleCancelModal = () => {
    setModal(null);
    setIsFeaturesError(null);
    form.resetFields();
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deletePosition(user?.position, record?.id).then(({ data }) => {
          SuccessAlert("Delete position success.");
          setPositions((pre) => {
            return pre.filter((data) => data.id !== record?.id);
          }).catch((err) => {
            console.log(err);
            ErrorAlert("Delete position fail.");
          });
        });
      },
    });
  };

  const modalAddPosition = () => (
    <Modal
      title="Position Information"
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
        title="Position Information"
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
      width: "10%",
    },
    {
      key: "2",
      title: "Name",
      width: "60%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Actions",
      width: "30%",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setModal("edit");
                form.setFieldValue("posName", record.name);
                setCurrentPosition(record);
              }}
            >
              edit
            </Button>
            <Button
              onClick={() => {
                onDeleteButton(record);
              }}
            >
              delete
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className="table">
      <>
        {modal === "add" && modalAddPosition()}
        {modal === "edit" && modalEditPosition(currentPosition)}
      </>
      <div className="buttonContainer">
        <Input.Search
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
          placeholder="input search text"
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
          Add new
        </Button>
      </div>
      {console.log(positions)}
      <Table
        columns={columns}
        dataSource={positions}
        scroll={{ y: "60vh" }}
        loading={positions ? false : true}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
      ></Table>
    </div>
  );
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
