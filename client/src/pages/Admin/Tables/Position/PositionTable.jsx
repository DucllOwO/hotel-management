import React, { useState, useEffect } from "react";
import "../index.css";
import { Table, Button, Modal, Input, Checkbox } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import PositionModal from "../../Modals/Position/PositionModal";
import { userRequest } from "../../../../api/api";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

const PositionTable = ({ positions, setPositions }) => {
  const { user } = useContext(AppContext);
  // const [featuresForAddPermissions, setFeaturesForAddPermissions] = useState(
  //   []
  // );
  const [features, setFeatures] = useState([]);
  // useEffect(() => {
  //   console.log(features);
  // }, [features]);
  const [modal, setModal] = useState("");
  const [positionName, setPositionName] = useState("");
  const [isPosNameError, setIsPosNameError] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const showModalAdd = (e) => {
    e.preventDefault();
    setModal("add");
  };
  const handleOKModalAdd = () => {
    setModal(null);
    if (positionName) {
      addPosition(positionName, createFeaturesCheckedArray(features));
      setPositionName("");
    } else {
      //setIsError("");
    }
  };
  // const handleOKModalEdit = () => {
  //   console.log("handleOKModalEdit");
  //   setModal(null);

  //   const featuresForAddPermissions =
  //     createFeaturesCheckedArray(featureCheckboxs);

  //   addPosition(positionName, featuresForAddPermissions);
  // };

  const handleCancelModal = () => {
    setModal(null);
    setPositionName("");
  };

  const createFeaturesCheckedArray = (featureCheckboxs) => {
    let tempArr = [];
    console.log(featureCheckboxs);
    featureCheckboxs.forEach((feature, index) => {
      if (feature?.read?.isCheck) tempArr.push(feature.read);

      if (feature?.create?.isCheck) tempArr.push(feature.create);

      if (feature?.update?.isCheck) tempArr.push(feature.update);

      if (feature?.delete?.isCheck) tempArr.push(feature.delete);
    });
    return tempArr;
  };

  const addPosition = async (name, featuresForAddPermissions) => {
    // const { data } = await userRequest.post(`/positions`, {
    //   user: {
    //     position: user?.position,
    //   },
    //   position: {
    //     name: name,
    //   },
    //   featuresForAddPermissions: featuresForAddPermissions,
    // });
    console.log({
      user: {
        position: user?.position,
      },
      position: {
        name: name,
      },
      featuresForAddPermissions: featuresForAddPermissions,
    });
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      const { data } = await userRequest.get("/features", {
        params: { user: { position: user?.position } },
      });
      setFeatures(data.features);
    };

    fetchFeatures();
  }, [user?.position]);

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
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.birthday)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
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
                //setIsAdd(false);
                //setModal(modalEditPosition(record.name));
                setPositionName(record.name);
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

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setPositions((pre) => {
          return pre.filter((data) => data.id !== record.id);
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
      <PositionModal
        positionName={positionName}
        setPositionName={setPositionName}
        features={features}
        setFeatures={setFeatures}
      ></PositionModal>
    </Modal>
  );

  // const modalEditPosition = (name) => (
  //   <Modal
  //     title="Position Information"
  //     open={true}
  //     onOk={handleOKModalEdit}
  //     onCancel={handleCancelModal}
  //     width="60%"
  //   >
  //     <PositionModal
  //       name={name}
  //       features={featureCheckboxs}
  //       setFeatureCheckboxs={setFeatureCheckboxs}
  //     ></PositionModal>
  //   </Modal>
  // );
  return (
    <div className="table">
      <>{modal === "add" ? modalAddPosition() : null}</>
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
      <Table
        columns={columns}
        dataSource={positions}
        scroll={{ y: 350 }}
        rowKey={(record) => record.id}
      ></Table>
    </div>
  );
};

export default PositionTable;
