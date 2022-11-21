import React, { useState, useEffect } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import PositionModal from "../../Modals/Position/PositionModal";
import { userRequest } from "../../../../api/api";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

const PositionTable = ({ positions, setPositions }) => {
  const [editingRow, setEditingRow] = useState(null);
  const { user } = useContext(AppContext);
  const [features, setFeatures] = useState([]);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handle = () => {
    setIsModalVisible(false);
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
        if (editingRow !== null) {
          if (editingRow === record.idNum) {
            return (
              <>
                <Button
                  htmlType="submit"
                  // onClick={() => {form.submit()}}
                >
                  save
                </Button>
                <Button
                  onClick={() => {
                    setEditingRow(null);
                  }}
                >
                  cancel
                </Button>
              </>
            );
          } else {
          }
        } else {
          return (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setEditingRow(record.idNum);
                  form.setFieldsValue({
                    name: record.name,
                    birthday: record.birthday,
                    username: record.username,
                    password: record.password,
                  });
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
        }
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
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  // const onFinish = (values) => {
  //   console.log(editingRow);
  //   const updateDataSource = [...positions];
  //   updateDataSource.splice(editingRow - 1, 1, {
  //     ...values,
  //     idNum: editingRow,
  //   });
  //   console.log(updateDataSource);
  //   setPositions(updateDataSource);
  //   setEditingRow(null);
  // };

  return (
    <div className="table">
      <>
        <Modal
          title="Position Information"
          visible={isModalVisible}
          onOk={handle}
          onCancel={handle}
          width="60%"
        >
          <PositionModal features={features}></PositionModal>
        </Modal>
      </>
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
