import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import "../index.css";
import { Table, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import HRForm from "../../../../components/Form/HRForm";
import { AppContext } from "../../../../context/AppContext";
import SuccessAlert from "../../../../components/Success/SusscessAlert.jsx/SuccessAlert";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../../../api/EmployeeAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";
import { formatDate, formatterInt } from "../../../../Utils/formatter";

const HRTable = ({ employees, setEmployees }) => {
  const [modal, setModal] = useState(null);
  const { user } = useContext(AppContext);
  const positionUser = user?.position;

  const showModal = () => {
    setModal("add");
  };

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "CCCD",
      dataIndex: "id",
      width: 145,
    },
    {
      key: "2",
      title: "Tên",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.fullname)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.id)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone_number)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "fullname",
      render: (text, record) => {
        return String(record.fullname);
      },
    },
    {
      key: "3",
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      render: (text, record) => {
        return String(record.date_of_birth);
      },
    },
    {
      key: "4",
      title: "Số điện thoại",
      dataIndex: "phone_number",
      render: (text, record) => {
        return String(record.phone_number);
      },
    },
    {
      key: "5",
      title: "Ngày vào làm",
      dataIndex: "start_working_date",
      render: (text, record) => {
        return String(record.start_working_date);
      },
    },
    {
      key: "6",
      title: "Lương",
      dataIndex: "salary",
      render: (text, record) => {
        return String(record.salary);
      },
    },
    {
      key: "7",
      title: "Hành động",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                openEditModal(record);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              onClick={() => {
                onDeleteButton(record);
              }}
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];

  const openEditModal = (record) => {
    setModal("edit");

    form.setFieldsValue({
      ...record,
      start_working_date: dayjs(record.start_working_date, "YYYY-MM-DD"),
      date_of_birth: dayjs(record.date_of_birth, "YYYY-MM-DD"),
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this employee?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteEmployee(positionUser, record?.id)
          .then(({ data }) => {
            setEmployees((pre) => {
              return pre.filter((data) => data.id !== record?.id);
            });
            SuccessAlert("Delete employee success.");
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Delete employee error!!");
          });
      },
    });
  };

  const handleCancelModal = () => {
    setModal(null);
    form.resetFields();
  };

  const modalAddEmployee = () => (
    <Modal
      title="Thông tin Nhân sự"
      open={true}
      onOk={handleOKModalAdd}
      onCancel={handleCancelModal}
      width="50%"
    >
      <HRForm form={form} />
    </Modal>
  );

  const handleOKModalAdd = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        onCreateEmployee(values);
      })
      .catch((error) => console.log(error));
  };

  const onCreateEmployee = (values) => {
    console.log(values);
    console.log({ ...values });
    createEmployee(positionUser, { ...values })
      .then(({ data }) => {
        setEmployees((prevPos) => [...prevPos, data]);
        SuccessAlert("Create employee success.");
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Create employee error!!");
      });
    setModal(null);
    form.resetFields();
  };

  const modalEditEmployee = () => {
    return (
      <Modal
        title="Thông tin Nhân sự"
        open={true}
        onOk={handleOKModalEdit}
        onCancel={handleCancelModal}
        width="60%"
      >
        <HRForm form={form} disable={true} />
      </Modal>
    );
  };

  const handleOKModalEdit = () => {
    form
      .validateFields()
      .then((values) => {
        onEditEmployee(positionUser, values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEditEmployee = (positionUser, values) => {
    console.log(values);
    updateEmployee(positionUser, { ...values })
      .then(({ data }) => {
        SuccessAlert("Edit employee success.");

        console.log();

        setEmployees((prev) => {
          return prev.map((item) => {
            if (item.id === values.id) {
              return {
                ...values,
                start_working_date: formatDate(values.start_working_date),
                date_of_birth: formatDate(values.date_of_birth),
                salary: formatterInt.format(values.salary),
              };
            }
            return item;
          });
        });
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Edit employee error!!");
      });

    setModal(null);
    form.resetFields();
  };

  return (
    <div className="table">
      <>
        {modal === "add" && modalAddEmployee()}
        {modal === "edit" && modalEditEmployee()}
      </>
      {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
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
            onClick={showModal}
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
        loading={employees ? false : true}
        columns={columns}
        dataSource={employees}
        scroll={{ y: 350 }}
        rowKey={(record) => record.id}
      ></Table>
    </div>
  );
};

export default HRTable;
