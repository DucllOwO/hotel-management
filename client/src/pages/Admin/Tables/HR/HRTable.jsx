import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import "../index.css";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
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
import moment from "moment";
import EditButton from "../../../../components/IconButton/EditButton/EditButton";
import DeleteButton from "../../../../components/IconButton/DeleteButton/DeleteButton";

const DEFAULT_PASSWORD = "123456";

const HRTable = ({ employees, setEmployees }) => {
  const [modal, setModal] = useState("");
  const { user } = useContext(AppContext);
  const positionUser = user?.position;

  const [isEmployeeExist, setIsEmployeeExist] = useState(false);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      key: "1",
      title: "CCCD",
      dataIndex: "id",
      fixed: "left",
    },
    {
      key: "2",
      title: "Họ Tên",
      // width: "20%",
      align: "center",
      filteredValue: [searchedText],
      fixed: "left",
      onFilter: (value, record) => {
        var dob = "";
        var startDay = "";
        dob =
          record.date_of_birth.slice(8, 10) +
          "-" +
          record.date_of_birth.slice(5, 7) +
          "-" +
          record.date_of_birth.slice(0, 4);
        startDay =
          record.start_working_date.slice(8, 10) +
          "-" +
          record.start_working_date.slice(5, 7) +
          "-" +
          record.start_working_date.slice(0, 4);
        return (
          String(record.fullname)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.id)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone_number)
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .includes(value.toLocaleLowerCase()) ||
          dob.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          startDay.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          String(record.email)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      dataIndex: "fullname",
      render: (text, record) => {
        return String(record.fullname);
      },
    },
    {
      key: "3",
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      // width: 150,
      // width: "20%",
      align: "center",
      sorter: (a, b) => a.date_of_birth.localeCompare(b.date_of_birth),
      render: (text, record) => {
        return String(formatDate(record.date_of_birth));
      },
    },
    {
      key: "4",
      title: "Số điện thoại",
      dataIndex: "phone_number",
      align: "center",
      // width: "15%",
      render: (text, record) => {
        return String(record.phone_number);
      },
    },
    {
      key: "5",
      title: "Ngày vào làm",
      dataIndex: "start_working_date",
      align: "center",
      // width: "20%",
      // width: 150,
      render: (text, record) => {
        return String(formatDate(record.start_working_date));
      },
      sorter: (a, b) =>
        a.start_working_date.localeCompare(b.start_working_date),
    },
    {
      key: "6",
      title: "Hành động",
      fixed: "right",
      render: (_, record) => {
        return (
          <>
            <div className="btnWrap">
              <EditButton
                onEditButton={(e) => {
                  openEditModal(record);
                }}
              ></EditButton>
              <DeleteButton
                onDeleteButton={() => onDeleteButton(record)}
              ></DeleteButton>
            </div>
          </>
        );
      },
    },
  ];

  const openEditModal = (record) => {
    setModal("edit");
    console.log({
      ...record,
      start_working_date: dayjs(record.start_working_date),
      date_of_birth: dayjs(record.date_of_birth),
    });
    form.setFieldsValue({
      ...record,
      start_working_date: dayjs(record.start_working_date),
      date_of_birth: dayjs(record.date_of_birth),
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

  const handleOKModalAdd = () => {
    if (!isEmployeeExist)
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
        {modal === "add" ? modalAddEmployee() : null}
        {modal === "edit" ? modalEditEmployee() : null}
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
        showSorterTooltip={false}
        loading={employees ? false : true}
        columns={columns}
        dataSource={employees}
        scroll={{ y: "60vh", x: "130%" }}
        rowKey={(record) => record.id}
      ></Table>
    </div>
  );

  function modalEditEmployee() {
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
  }
  function handleCancelModal() {
    setModal(null);
    form.resetFields();
  }

  function modalAddEmployee() {
    return (
      <Modal
        title="Thông tin Nhân sự"
        open={true}
        onOk={handleOKModalAdd}
        onCancel={handleCancelModal}
        width="50%"
      >
        <HRForm
          form={form}
          isEmployeeExist={isEmployeeExist}
          setIsEmployeeExist={setIsEmployeeExist}
        />
      </Modal>
    );
  }

  function showModal() {
    setModal("add");
  }
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
