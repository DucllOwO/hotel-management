import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";

const PaymentTable = ({ payment, setPayment }) => {
  const [type, setType] = useState("day");

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Ngày lập",
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
      title: "Lí do",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.date)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter the purpose",
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
      title: "Thành tiền",
      dataIndex: "cost",
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
      key: "5",
      title: "Thao tác",
      render: (_, record) => {
        if (editingRow !== null) {
          if (editingRow === record.idNum) {
            return (
              <>
                <Button
                  htmlType="submit"
                  // onClick={() => {form.submit()}}
                >
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    setEditingRow(null);
                  }}
                >
                  Huỷ
                </Button>
              </>
            );
          } else {
          }
        } else {
          return (
            <>
              <Button
              // onClick={(e) => {
              //   e.preventDefault();
              //   setEditingRow(record.idNum);
              //   form.setFieldsValue({
              //     date: record.date,
              //     total: record.total,
              //   });
              // }}
              >
                Chỉnh sửa
              </Button>
              <Button
                onClick={() => {
                  onDeleteButton(record);
                }}
              >
                Xoá
              </Button>
            </>
          );
        }
      },
    },
  ];

  const onChange = (date, dateString) => {
    //console.log(date, dateString);
  };

  const onAddButton = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newData = {
      idNum: "" + parseInt(payment.length + 1),
      date: "Date " + randomNumber,
      amount: "20",
      price: randomNumber + " price",
    };

    setPayment((pre) => {
      return [...pre, newData];
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setPayment((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...payment];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setPayment(updateDataSource);
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
            Năm
          </Button>
          <Button
            className="dateBtn"
            type={type === "month" ? "primary" : "default"}
            onClick={() => {
              setType("month");
            }}
          >
            Tháng
          </Button>
          <Button
            className="dateBtn"
            type={type === "day" ? "primary" : "default"}
            onClick={() => {
              setType("day");
            }}
          >
            Ngày
          </Button>
        </div>
        <div>
          {type === "day" && (
            <DatePicker
              onChange={onChange}
              defaultValue={moment()}
              picker="date"
              format={dateFormat}
            ></DatePicker>
          )}
          {type === "month" && (
            <DatePicker
              onChange={onChange}
              defaultValue={dayjs(Date.now())}
              picker="month"
              format={monthFormat}
            ></DatePicker>
          )}
          {type === "year" && (
            <DatePicker
              onChange={onChange}
              defaultValue={dayjs(Date.now())}
              picker="year"
            ></DatePicker>
          )}
          <Button
            style={{ marginLeft: "5px" }}
            onClick={onAddButton}
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
          dataSource={payment}
          scroll={{ y: 350 }}
        ></Table>
      </Form>
    </div>
  );
};

export default PaymentTable;
