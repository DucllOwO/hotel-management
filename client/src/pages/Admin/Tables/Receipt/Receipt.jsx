import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import "antd/dist/antd.less";

const ReceiptTable = ({ receipt, setReceipt }) => {
  const [type, setType] = useState("day");

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
      title: "Date",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.date)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      dataIndex: "established_date",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter the date",
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
      title: "Total",
      dataIndex: "total_cost",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                  message: "Please enter the total",
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
      title: "Actions",
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
                    date: record.date,
                    total: record.total,
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

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setReceipt((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...receipt];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setReceipt(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div>
          <Button
            className="dateBtn"
            type={type === "year" ? "primary" : "default"}
            onClick={() => {
              setType("year");
            }}
          >
            Year
          </Button>
          <Button
            className="dateBtn"
            type={type === "month" ? "primary" : "default"}
            onClick={() => {
              setType("month");
            }}
          >
            Month
          </Button>
          <Button
            className="dateBtn"
            type={type === "day" ? "primary" : "default"}
            onClick={() => {
              setType("day");
            }}
          >
            Day
          </Button>
        </div>
        <div>
          <div></div>
          <div>
            {type === "day" && <DatePicker onChange={onChange}></DatePicker>}
            {type === "month" && (
              <DatePicker onChange={onChange} picker="month"></DatePicker>
            )}
            {type === "year" && (
              <DatePicker onChange={onChange} picker="year"></DatePicker>
            )}
          </div>
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={receipt}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default ReceiptTable;
