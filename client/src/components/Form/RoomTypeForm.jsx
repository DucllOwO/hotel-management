import { Col, Divider, Form, Input, InputNumber, Row, Table } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React from "react";
import UtilitiesButton from "../Button/UtilitiesButton/UtilitiesButton";
import InputCurrencyCustom from "../CustomAntd/InputNumber/InputCurrencyCustom";
import InputNumberCustom from "../CustomAntd/InputNumber/InputNumberCustom";

const RoomTypeForm = ({ form, utils, setUtils }) => {
  return (
    <Form layout="vertical" form={form}>
      <Row justify="space-around">
        <Col span={8}>
          <Form.Item
            label="Tên loại phòng"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại phòng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng khách"
            name="max_customer"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại phòng!",
              },
            ]}
          >
            <InputNumberCustom />
          </Form.Item>
          <Form.Item label="Số giường" name="bed_amount">
            <InputNumberCustom />
          </Form.Item>
          <Form.Item label="Diện tích" name="area">
            <InputNumberCustom />
          </Form.Item>
        </Col>
        <Col span={14} offset={2}>
          <Table
            dataSource={priceInputDataSource}
            columns={columns}
            pagination={false}
            bordered={true}
          ></Table>
        </Col>
      </Row>
      <Divider orientation="left">Tiện ích loại phòng</Divider>
      <Row>
        {utils
          ? utils.map((util) => {
              return (
                <CheckableTag
                  key={util.id}
                  checked={util.checked}
                  style={{ margin: "5px 0 0 5px", fontSize: 18, padding: 5 }}
                  onChange={(checked) => handleChange(util, checked)}
                >
                  {util.name}
                </CheckableTag>
              );
            })
          : null}
      </Row>
    </Form>
  );

  function handleChange(util, checked) {
    setUtils((prev) =>
      prev.map((utilTemp) => {
        if (util.name === utilTemp.name)
          return { ...utilTemp, checked: !utilTemp.checked };
        return utilTemp;
      })
    );
  }
};

const priceInputDataSource = [
  {
    timeType: "Giờ đầu tiên",
    inputFormItem: (
      <Form.Item name="first_hour_price">
        <InputCurrencyCustom />
      </Form.Item>
    ),
  },
  {
    timeType: "Một giờ",
    inputFormItem: (
      <Form.Item name="hour_price">
        <InputCurrencyCustom />
      </Form.Item>
    ),
  },
  {
    timeType: "Một ngày",
    inputFormItem: (
      <Form.Item name="one_day_price">
        <InputCurrencyCustom />
      </Form.Item>
    ),
  },
  {
    timeType: "Qua đêm",
    inputFormItem: (
      <Form.Item name="overnight_price" style={{ margin: "auto" }}>
        <InputCurrencyCustom />
      </Form.Item>
    ),
  },
];

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
      return <p>{text}</p>;
    },
  },
];

export default RoomTypeForm;
