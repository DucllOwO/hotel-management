import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { useContext } from "react";
import Import from "../Admin/Import/Import";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const ImportForm = ({ form, data, setData }) => {
  const { user } = useContext(AppContext);

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    fetchItems(user?.position)
      .then(({ data }) => {
        console.log(data);
        setListItem(createOptionSelect(data));
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy dữ liệu sản phẩm thất bại!!");
      });
  }, [user?.position]);

  return (
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div style={{ width: "60vw" }}>
          <Form.Item
            label="Nhân viên"
            name="id"
            tooltip="Số CMND của nhân viên đang làm việc"
          >
            <Input
              size="large"
              disabled={true}
              defaultValue={user?.account.fullname}
            />
          </Form.Item>

          <Import
            items={listItem}
            setListItem={setListItem}
            importList={data}
            setImportList={setData}
          ></Import>
        </div>
      </div>
    </Form>
  );

  function createOptionSelect(arr) {
    return arr.map((item) => {
      return {
        option: {
          label: item.name,
          value: item.id,
        },
        unitPrice: item.sell_price,
      };
    });
  }
};

{
  /* <Form.List>
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        <Space key={field.key} align="baseline">
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.area !== curValues.area ||
              prevValues.sights !== curValues.sights
            }
          >
            {() => (
              <Form.Item
                {...field}
                label="Sight"
                name={[field.name, "sight"]}
                rules={[{ required: true, message: "Missing sight" }]}
              >
                <Select
                  disabled={!form.getFieldValue("area")}
                  style={{ width: 130 }}
                >
                  {/* {(sights[form.getFieldValue('area') as SightsKeys] || []).map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))} */
}
//                 </Select>
//               </Form.Item>
//             )}
//           </Form.Item>
//           <Form.Item
//             {...field}
//             label="Price"
//             name={[field.name, "price"]}
//             rules={[{ required: true, message: "Missing price" }]}
//           >
//             <Input />
//           </Form.Item>
//         </Space>
//       ))}

//       <Form.Item>
//         <Button type="dashed" onClick={() => add()} block>
//           Add sights
//         </Button>
//       </Form.Item>
//     </>
//   )}
// </Form.List>; */}

export default ImportForm;
