import React, { useState, useEffect } from "react";
import "../index.css";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import PositionModal from "../../Modals/Position/PositionModal";
import { userRequest } from "../../../../api/api";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { FEATURES } from "../../../../Utils/constants";

const PositionTable = ({ positions, setPositions }) => {
  //const { user } = useContext(AppContext);
  //const [features, setFeatures] = useState([]);
  const [modal, setModal] = useState(null);
  const [checkboxs, setCheckboxs] = useState([]);

  const [searchedText, setSearchedText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    //setIsAdd(true);
    setModal(modalAddPosition());
  };
  const handleOKModalAdd = () => {
    console.log("handleOKModalAdd");
    setModal(null);
  };
  const handleOKModalEdit = () => {
    console.log("handleOKModalEdit");
    setModal(null);
  };

  const handleCancelModal = () => {
    setModal(null);
  };

  // useEffect(() => {
  //   const fetchFeatures = async () => {
  //     const { data } = await userRequest.get("/features", {
  //       params: { user: { position: user?.position } },
  //     });
  //     setFeatures(data.features);
  //   };
  //   fetchFeatures();
  // }, [user?.position]);

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
                setIsModalVisible(true);
                //setIsAdd(false);
                setModal(modalEditPosition(record.name));
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
      <PositionModal features={FEATURES}></PositionModal>
    </Modal>
  );

  const modalEditPosition = (name) => (
    <Modal
      title="Position Information"
      open={true}
      onOk={handleOKModalEdit}
      onCancel={handleCancelModal}
      width="60%"
    >
      <PositionModal name={name} features={FEATURES}></PositionModal>
    </Modal>
  );

  return (
    <div className="table">
      <>{modal}</>
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
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
          onClick={showModal}
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
