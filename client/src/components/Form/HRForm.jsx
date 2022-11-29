import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { fetchPosition } from "../../api/PositionAPI";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const DATE_FORMAT = "DD-MM-YYYY";

const HRForm = ({ form, disable = false }) => {
  const { user } = useContext(AppContext);
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    fetchPosition(user?.position)
      .then(({ data }) => {
        console.log(data);
        setPositions(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Fetch position data for select component error!!");
      });
  }, [user?.position]);

  return (
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div className="left">
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input ID!",
              },
              {
                max: 12,
                message: "ID cannot longer than 10 characters",
              },
            ]}
            tooltip="Identity card"
          >
            <Input size="large" disabled={disable} />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input full name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="date_of_birth"
            rules={[
              {
                required: true,
                message: "Please input birthday!",
              },
              {
                type: "date",
              },
            ]}
          >
            <DatePicker size="large" format={DATE_FORMAT} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input phone!",
              },
              {
                min: 10,
              },
              {
                max: 10,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <div className="right">
          <Form.Item
            label="Position"
            name="position_id"
            rules={[
              {
                required: true,
                message: "Please choose position!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a position"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={positions.map((position) => {
                return {
                  label: position?.name,
                  value: position?.id,
                };
              })}
            />
          </Form.Item>
          {/* <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item> */}
          <Form.Item
            label="Starting Date"
            name="start_working_date"
            rules={[
              {
                required: true,
                message: "Please input starting date!",
              },
              {
                type: "date",
              },
            ]}
          >
            <DatePicker size="large" format={DATE_FORMAT} showToday />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[
              {
                required: true,
                message: "Please input salary!",
              },
              {
                type: "number",
              },
            ]}
          >
            <InputNumber
              size="large"
              controls={false}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default HRForm;
