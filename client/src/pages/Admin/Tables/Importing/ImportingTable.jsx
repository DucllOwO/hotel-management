import React, { useState } from "react";
import "../index.css";
import { Table, Button, Modal, Form, Input, Slider } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ImportingTable = ({ importingRecord, setRecord }) => {
  const navigate = useNavigate();

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const [searchedText, setSearchedText] = useState("");

  const amountMark = {
    1: "1",
    200: "200",
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: "10%",
      align: "center",
    },
    {
      key: "2",
      title: "Ngày lập",
      filteredValue: [searchedText],
      align: "center",
      onFilter: (value, record) => {
        return (
          String(record.established_date)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.item)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
      dataIndex: "established_date",
      sorter: (a, b) => a.established_date.localeCompare(b.established_date),
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
      title: "Tên sản phẩm",
      dataIndex: "item",
      align: "center",
      sorter: (a, b) => a.item.localeCompare(b.item),
    },
    {
      key: "4",
      title: "Số lượng",
      dataIndex: "amount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
      filterDropdown: () => {
        return (
          <>
            <div className="filterContainer">
              <Slider
                range
                max={200}
                min={1}
                marks={amountMark}
                defaultValue={[10, 20]}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <Button type="primary">Reset</Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <FilterOutlined />;
      },
    },
    {
      key: "5",
      title: "Thành tiền",
      dataIndex: "total_cost",
      align: "center",
      // sorter: (a, b) => a.total.localeCompare(b.total),
    },
    // {
    //   key: "6",
    //   title: "Thao tác",
    //   render: (_, record) => {
    //     if (editingRow !== null) {
    //       if (editingRow === record.idNum) {
    //         return (
    //           <>
    //             <Button
    //               htmlType="submit"
    //               // onClick={() => {form.submit()}}
    //             >
    //               Lưu
    //             </Button>
    //             <Button
    //               onClick={() => {
    //                 setEditingRow(null);
    //               }}
    //             >
    //               Huỷ
    //             </Button>
    //           </>
    //         );
    //       } else {
    //       }
    //     } else {
    //       return (
    //         <>
    //           <Button
    //             onClick={(e) => {
    //               e.preventDefault();
    //               setEditingRow(record.idNum);
    //               form.setFieldsValue({
    //                 date: record.date,
    //                 total: record.total,
    //               });
    //             }}
    //           >
    //             Chỉnh sửa
    //           </Button>
    //           <Button
    //             onClick={() => {
    //               onDeleteButton(record);
    //             }}
    //           >
    //             Xoá
    //           </Button>
    //         </>
    //       );
    //     }
    //   },
    // },
  ];

  const onAddButton = () => {
    navigate("/admin/import");
  };

  const onDeleteButton = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá dữ liệu?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setRecord((pre) => {
          return pre.filter((data) => data.idNum !== record.idNum);
        });
      },
    });
  };

  const onFinish = (values) => {
    console.log(editingRow);
    const updateDataSource = [...importingRecord];
    updateDataSource.splice(editingRow - 1, 1, {
      ...values,
      idNum: editingRow,
    });
    console.log(updateDataSource);
    setRecord(updateDataSource);
    setEditingRow(null);
  };

  return (
    <div className="table">
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
            onClick={onAddButton}
            className="addButton"
            type="primary"
            ghost
            icon={<PlusOutlined />}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={importingRecord}
        scroll={{ y: "100%", x: "100%" }}
      ></Table>
    </div>
  );
};

export default ImportingTable;
