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
import { createAccount, deleteAccount } from "../../../../api/AccountAPI";

const DEFAULT_PASSWORD = "123456";

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
        return String(formatDate(record.date_of_birth));
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
        return String(formatDate(record.date_of_birth));
      },
    },
    {
      key: "6",
      title: "Email",
      dataIndex: "email",
      render: (text, record) => {
        return String(record.email);
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
      start_working_date: dayjs(record.start_working_date, "DD-MM-YYYY"),
      date_of_birth: dayjs(record.date_of_birth, "DD-MM-YYYY"),
    });
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc là bạn muốn xóa nhân viên này?",
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
      onOk: async () => {
        try {
          if (record?.username) {
            const res = await deleteAccount(positionUser, record.username);
          }
          await deleteEmployee(positionUser, record?.id);

          setEmployees((pre) => {
            return pre.filter((data) => data.id !== record?.id);
          });
          SuccessAlert("Xóa nhân viên thành công.");
        } catch (error) {
          console.log(error);
          ErrorAlert("Xóa nhân viên thất bại!!");
        }
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

  const onCreateEmployee = async (values) => {
    try {
      const { data: accountData } = await createAccount(positionUser, {
        username: values.id,
        email: "",
        password: DEFAULT_PASSWORD,
      });
      console.log(accountData);
      const { data: employeeData } = await createEmployee(positionUser, {
        ...values,
        username: accountData[0].username,
      });

      SuccessAlert("Tạo nhân viên thành công.");
      SuccessAlert(
        "Tự động tạo tài khoản cho nhân viên thành công, vui lòng kiểm tra."
      );

      setEmployees((prevPos) => [...prevPos, employeeData]);
    } catch (error) {
      console.log(error);
      ErrorAlert("Tạo nhân viên thất bại!!");
    }

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
        ErrorAlert("Cập nhật thông tin nhân viên thất bại!!");
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

//createAccount(positionUser, {
//   username: values.id,
//   email: "",
//   password: DEFAULT_PASSWORD,
// })
//   .then(({ data: accountData }) => {
//     console.log(accountData);
//     createEmployee(positionUser, {
//       ...values,
//       username: accountData.username,
//     })
//       .then(({ data: employeeData }) => {
//         setEmployees((prevPos) => [...prevPos, employeeData]);
//         SuccessAlert("Tạo nhân viên thành công.");
//         SuccessAlert(
//           "Tự động tạo tài khoản cho nhân viên thành công, vui lòng kiểm tra."
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//         ErrorAlert("Tạo nhân viên thất bại!!");
//         deleteAccount(positionUser, accountData.username);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//     ErrorAlert("Tạo nhân viên thất bại!!");
//   });
