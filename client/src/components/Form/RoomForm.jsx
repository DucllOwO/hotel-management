import { Form, Input, Select, Col, Row, Table, Divider } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, { useEffect, useState } from "react";
import { getRoomUtilsByRoomTypeID } from "../../api/hasRoomFeatures";
import { getRoomTypeByID } from "../../api/RoomTypeAPI";
import ErrorAlert from "../Error/Alert/ErrorAlert";
const RoomForm = ({ form, options, positionUser, rooms, editing = false }) => {
  const [optionSelected, setOptionSelected] = useState(
    form.getFieldValue("room_type_id")
  );
  const roomName = form.getFieldValue("room_name");
  const [utils, setUtils] = useState([]);
  const [roomType, setRoomType] = useState({});

  useEffect(() => {
    const resUtil = getRoomUtilsByRoomTypeID(positionUser, optionSelected);
    const resRoomType = getRoomTypeByID(positionUser, optionSelected);

    Promise.all([resRoomType, resUtil])
      .then((res) => {
        console.log(res);
        if (res) {
          setRoomType(res[0].data);
          setUtils(res[1].data);
        }
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy thông tin của loại phòng thất bại!!");
      });
  }, [optionSelected, positionUser]);

  return (
    <Form layout="vertical" form={form}>
      <Row>
        <Col span={8}>
          <Form.Item
            label="Tên phòng"
            name="room_name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên phòng.",
              },
              {
                max: 4,
                message: "Tên phòng không được quá 4 kí tự.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length > 0) {
                    // check every except current room
                    let roomsTemp = rooms.filter(
                      (room) => room.room_name !== roomName
                    );

                    let index = roomsTemp.findIndex(
                      (room) => room.room_name === value
                    );

                    return index < 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Tên phòng đã tồn tại. Vui lòng nhập tên khác."
                          )
                        );
                  }
                },
              }),
            ]}
            tooltip="Ví dụ tên phòng: A001, B001,..."
          >
            <Input size="large" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Loại phòng"
            name="room_type_id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại phòng.",
              },
            ]}
            initialValue={optionSelected}
          >
            <Select
              size="large"
              showSearch
              placeholder="Chọn một loại phòng"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={options}
              onChange={(e) => {
                console.log(e);
                setOptionSelected(e);
              }}
              defaultValue={optionSelected}
            />
          </Form.Item>
        </Col>
        <Col span={12} offset={3}>
          <Divider orientation="left">Thông tin của loại phòng</Divider>
          <Table
            dataSource={createDataSource(roomType)}
            columns={columns}
            pagination={false}
            bordered={true}
          />
          <Divider orientation="left">Tiện ích loại phòng</Divider>
          {utils
            ? utils.map((util) => {
                return (
                  <CheckableTag
                    key={util.id}
                    checked={true}
                    style={{
                      margin: "5px 0 0 5px",
                      fontSize: 18,
                      padding: 5,
                      border: "1px solid black",
                    }}
                  >
                    {util.room_feature.name}
                  </CheckableTag>
                );
              })
            : null}
        </Col>
      </Row>
    </Form>
  );

  function createDataSource(roomType) {
    return [
      {
        timeType: "Giờ đầu tiên",
        inputFormItem: roomType.first_hour_price,
      },
      {
        timeType: "Một giờ",
        inputFormItem: roomType.hour_price,
      },
      {
        timeType: "Một ngày",
        inputFormItem: roomType.one_day_price,
      },
      {
        timeType: "Qua đêm",
        inputFormItem: roomType.overnight_price,
      },
    ];
  }
};

const columns = [
  {
    key: "1",
    title: "Loại giờ",
    dataIndex: "timeType",
    width: "50%",
    render: (text, record) => {
      return <p>{text}</p>;
    },
  },
  {
    key: "2",
    title: "Giá",
    dataIndex: "inputFormItem",
    align: "center",
    render: (text, record) => {
      return <p>{text ? text.toLocaleString() : ""}</p>;
    },
  },
];

export default RoomForm;

// const [fileList, setFileList] = useState([]);

// // const onChange = ({ fileList: newFileList }) => {
// //   setFileList(newFileList);
// // };

// // const onPreview = async (file) => {
// //   let src = file.url;
// //   if (!src) {
// //     src = await new Promise((resolve) => {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file.originFileObj);
// //       reader.onload = () => resolve(reader.result);
// //     });
// //   }
// //   const image = new Image();
// //   image.src = src;
// //   const imgWindow = window.open(src);
// //   imgWindow?.document.write(image.outerHTML);
// // };
