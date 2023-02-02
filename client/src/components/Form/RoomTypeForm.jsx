import { Col, Divider, Form, Input, InputNumber, Row, Table } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React from "react";
import UtilitiesButton from "../Button/UtilitiesButton/UtilitiesButton";
import InputCurrencyCustom from "../CustomAntd/InputNumber/InputCurrencyCustom";
import InputNumberCustom from "../CustomAntd/InputNumber/InputNumberCustom";
import ErrorMessage from "../Error/ErrorMessage/ErrorMessage";

const RoomTypeForm = ({ form, utils, setUtils, isUtilEmpty }) => {
  const priceInputDataSource = [
    {
      timeType: "Giờ đầu tiên",
      inputFormItem: (
        <Form.Item
          name="first_hour_price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá của giờ đầu tiên!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value > 999) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Gía giờ đầu tiên phải lớn hơn hoặc bằng 1,000đ!")
                );
              },
            }),
          ]}
        >
          <InputNumber
            addonAfter={String("đ")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      ),
    },
    {
      timeType: "Một giờ",
      inputFormItem: (
        <Form.Item
          name="hour_price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá một giờ!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value > 999) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Gía một giờ phải lớn hơn hoặc bằng 1,000đ!")
                );
              },
            }),
          ]}
        >
          <InputNumber
            addonAfter={String("đ")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      ),
    },
    {
      timeType: "Một ngày",
      inputFormItem: (
        <Form.Item
          name="one_day_price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá một ngày!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value > 999) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Gía một ngày phải lớn hơn hoặc bằng 1,000đ!")
                );
              },
            }),
          ]}
        >
          <InputNumber
            addonAfter={String("đ")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      ),
    },
    {
      timeType: "Qua đêm",
      inputFormItem: (
        <Form.Item
          name="overnight_price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá qua đêm!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value > 999) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Gía qua đêm phải lớn hơn hoặc bằng 1,000đ!")
                );
              },
            }),
          ]}
        >
          <InputNumber
            addonAfter={String("đ")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      ),
    },
  ];

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
            name="max_customers"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng khách!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 32767)
                    return Promise.reject(new Error("Số lượng khách quá lớn!"));
                  if (value > 0) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Số lượng khách phải lớn hơn 0!")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
          <Form.Item
            label="Số giường"
            name="bed_amount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số giường!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 32767)
                    return Promise.reject(new Error("Số lượng khách quá lớn!"));
                  if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Số lượng giường phải lớn hơn 0!")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
          <Form.Item
            label="Diện tích"
            name="area"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập diện tích phòng!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 32767)
                    return Promise.reject(new Error("Số lượng khách quá lớn!"));
                  if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Diện tích phải lớn hơn 0!"));
                },
              }),
            ]}
          >
            <InputNumber
              addonAfter={
                <p>
                  m<sup>2</sup>
                </p>
              }
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
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
                  style={{
                    margin: "5px 0 0 5px",
                    fontSize: 18,
                    padding: 5,
                    border: "1px solid black",
                  }}
                  onChange={(checked) => handleChange(util, checked)}
                >
                  {util.name}
                </CheckableTag>
              );
            })
          : null}
      </Row>
      <Row>
        {isUtilEmpty ? (
          <ErrorMessage message="Vui lòng chọn ít nhất một tiện ích." />
        ) : null}
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
      if (typeof text === "string" || text instanceof String)
        return <p>{text ? text.toLocaleString() : ""}</p>;
      return text;
    },
  },
];

export default RoomTypeForm;
