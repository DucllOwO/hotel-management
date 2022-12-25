import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const DATE_FORMAT = "DD-MM-YYYY";

const ImportForm = ({ form }) => {
  const { user } = useContext(AppContext);
//   const [positions, setPositions] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  useEffect(() => {
    // console.log(user?.account.fullname)
    fetchItems(user?.position)
    .then(({data}) => {
        setListItem(data);
    })
  }, []);

  const items = listItem.map((item) => {
    return {
        label: item.name,
        value: item.id,
    }
  })

  const calcTotalCost = () => {
    setTotalCost(quantity * price);
    // console.log(totalCost)
  }

  return (
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div className="left" style={{ width: "30vw" }}>
          <Form.Item
            label="Nhân viên"
            name="id"
            tooltip="Số CMND của nhân viên đang làm việc"
          >
            <Input size="large" disabled={true} defaultValue={user?.account.fullname}/>
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="item"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn sản phẩm cần nhập!",
              },
            ]}
          >
            <Select 
                size="large" 
                options={items} />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng sản phẩm!",
              },
            ]}
            
          >
            <InputNumber size="large" min={0} onChange={(value) => {setQuantity(value); calcTotalCost()}}/>
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá sản phẩm!",
              },
            ]}
          >
            <InputNumber size="large" min={0} addonAfter={"đ"} onChange={(value) => {setPrice(value); calcTotalCost()}}/>
          </Form.Item>
          <Form.Item
            label="Thành tiền"
            name="total_cost"
          >
            <Input size="large" disabled={true} addonAfter={"đ"} value={totalCost}/>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default ImportForm;
