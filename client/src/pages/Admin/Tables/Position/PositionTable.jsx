import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";

const PositionTable = () => {
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [dataSource, setDataSource] = useState([
    {
      idNum: 1,
      name: "admin",
    },
    {
      idNum: 2,
      name: "staff",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      colSpan: 1,
      dataIndex: "idNum",
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

  const onAddButton = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newData = {
      idNum: "" + parseInt(dataSource.length + 1),
      name: "Name " + randomNumber,
      birthday: "23/03/2002",
      username: randomNumber + " username",
    };

    setDataSource((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...dataSource];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setDataSource(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
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
          onClick={onAddButton}
          className="addButton"
          type="primary"
          ghost
          icon={<PlusOutlined />}
        >
          Add new
        </Button>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default PositionTable;
