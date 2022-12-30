import { DatePicker, Form, Input, InputNumber } from "antd";
import React from "react";
import { hasWhiteSpace } from "../../Utils/helpers";
const { RangePicker } = DatePicker;

const PromotionForm = ({ form }) => {
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name="name"
        label="Mã phiếu giảm giá"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã giảm giá",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value) {
                if (!hasWhiteSpace(value)) return Promise.resolve();
                else
                  return Promise.reject(
                    new Error("Mã giảm không được có khoảng trắng")
                  );
              }
              return Promise.resolve();
            },
          }),
        ]}
        tooltip="Ví dụ mã như: TET2022, XUAN2022,... (Lưu ý: Mã sẽ tự động viết hoa)"
      >
        <Input style={{ textTransform: "uppercase" }} />
      </Form.Item>
      <Form.Item
        name="offer"
        label="Giảm"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập giảm bao nhiêu %",
          },
        ]}
      >
        <InputNumber min={1} max={100} addonAfter={String("%")} />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Hiệu lực"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn hiệu lực.",
          },
        ]}
      >
        <RangePicker suffixIcon={null} />
      </Form.Item>
    </Form>
  );
};

export default PromotionForm;
