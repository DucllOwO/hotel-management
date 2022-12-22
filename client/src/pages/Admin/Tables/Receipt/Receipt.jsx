import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import DetailForm from "../../../../components/Form/DetailForm/DetailForm";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const ReceiptTable = ({ receipt, setReceipt }) => {
  const [type, setType] = useState("day");

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const [modal, setModal] = useState(false);

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
      title: "Tổng tiền",
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
      title: "Phương thức",
      dataIndex: "payment_method",
      render: (text, record) => {
        if (editingRow === record.idNum) {
          return (
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                  message: "Please enter the method",
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
        return (
          <>
            <div className="btnWrap">
              <EditButton openModalEdit={() => {}}></EditButton>
              <DeleteButton onDeleteButton={onDeleteButton}></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
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

  const handleOKModal = () => {
    setModal(false);
  };

  const handleCancelModal = () => {
    setModal(false);
  };

  const ModalDetail = () => {
    return (
      <Modal
        title="INVOICE #123123"
        open={true}
        onOk={handleOKModal}
        onCancel={handleCancelModal}
        width="60%"
      >
        <DetailForm></DetailForm>
      </Modal>
    );
  };

  return (
    <div className="table">
      {modal === true && ModalDetail()}
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
      <div className="buttonContainer">
        <div>
          <Button
            onClick={() => {
              setModal(true);
            }}
          >
            Modal
          </Button>
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
          <div></div>
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
                picker="year"
                defaultValue={dayjs(Date.now())}
              ></DatePicker>
            )}
          </div>
        </div>
      </div>
      <Form form={form} onFinish={onFinish} className="form">
        <Table
          columns={columns}
          dataSource={receipt}
          scroll={{ y: "100%", x: "100%" }}
        ></Table>
      </Form>
    </div>
  );
};

export default ReceiptTable;
