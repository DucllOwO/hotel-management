import { DatePicker, Form, Input, InputNumber, Select, Table, Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchItems } from "../../api/ItemAPI";
import { useContext } from "react";
import Import from "../Admin/Import/Import";
import { AppContext } from "../../context/AppContext";
import ErrorAlert from "../Error/Alert/ErrorAlert";

const DATE_FORMAT = "DD-MM-YYYY";

const ImportForm = ({ form }) => {
  const { user } = useContext(AppContext);
//   const [positions, setPositions] = useState([]);
  const [listItem, setListItem] = useState([]);
  
  
  useEffect(() => {
    if(listItem)
    {
        fetchItems(user?.position)
        .then(({data}) => {
            setListItem(data);
        })
    }
  }, []);

  const items = listItem.map((item) => {
    return {
        label: item.name,
        value: item.id,
    }
  })

  
  
    const handleAdd = () => {
        
    };
  return (
    <Form layout="vertical" form={form} name="positionForm" autoComplete="off">
      <div className="modal">
        <div style={{ width: "60vw" }}>
          <Form.Item
            label="Nhân viên"
            name="id"
            tooltip="Số CMND của nhân viên đang làm việc"
          >
            <Input size="large" disabled={true} defaultValue={user?.account.fullname}/>
          </Form.Item>
          <Import items={items}></Import>
          {/* <Table
            // components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
          </Button> */}
          {/* <Form.Item
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
            <InputNumber size="large" min={0} onChange={(value) => { setQuantity(value);}}/>
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
            <InputNumber size="large" min={0} addonAfter={"đ"} onChange={(value) => {setPrice(value);}}/>
          </Form.Item>
          <Form.Item
            label="Thành tiền"
            name="total_cost"
          >
            <Input size="large" addonAfter={"đ"} disabled={true} placeholder={totalCost}/>
          </Form.Item> */}
        </div>
      </div>
    </Form>
  );
};

export default ImportForm;
