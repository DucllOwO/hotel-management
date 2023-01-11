import { Button, Col, Form, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import Column from "antd/es/table/Column";
import React, { useState } from "react";
import "./detailform.css";
import DetailRoomTable from "./Tables/DetailRoomTable";
import dayjs from "dayjs";
import { useEffect } from "react";
import { getUsedRoomByBookingID } from "../../../api/UsedRoomAPI";
import { fetchInventoryDetailByBookingID } from "../../../api/InventoryAPI";
import ErrorAlert from "../../Error/Alert/ErrorAlert";

const DATE_FORMAT = "HH:mm, DD-MM-YYYY";

const DetailForm = ({ receipt, positionUser }) => {
  const [usedRooms, setUsedRoom] = useState([]);

  useEffect(() => {
    const usedRoomRes = getUsedRoomByBookingID(positionUser, receipt.booking_id.id);

    const inventoryDetailRes = fetchInventoryDetailByBookingID(
      positionUser,
      receipt.booking_id.id
    );

    Promise.all([usedRoomRes, inventoryDetailRes])
      .then((res) => {
        const usedRooms = res[0].data;
        const inventoryDetail = res[1].data;

        const usedRoomTemp = usedRooms.map((usedRoom) => {
          const invenDetailTemp = inventoryDetail.find(
            (value) => value.room_id === usedRoom.room_id.id
          );

          if (invenDetailTemp) {
            return {
              ...invenDetailTemp,
              roomInfo: {
                ...usedRoom.room_id,
                price: usedRoom.price,
              },
            };
          } else {
            return {
              room_id: usedRoom.room_id.id,
              roomInfo: {
                ...usedRoom.room_id,
                price: usedRoom.price,
              },
            };
          }
        });

        setUsedRoom(usedRoomTemp);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert(
          "Lấy dữ liệu phòng và sản phẩm sử dụng của hóa đơn thất bại!!"
        );
      });
  }, []);

  return (
    <div>
      <div className="modal">
        <div className="left">
          <Form.Item label="Thời gian">
            <span className="formItem">{receipt.established_date}</span>
          </Form.Item>
          <Form.Item label="Khách hàng">
            <span className="formItem">
              {receipt.booking_id
                ? receipt?.booking_id?.customer_id?.fullname +
                  " | " +
                  receipt?.booking_id?.customer_id?.id
                : ""}
            </span>
          </Form.Item>
        </div>
        <div className="right">
          <Form.Item label="Check-in">
            <span className="formItem">
              {receipt?.checkin_time
                ? dayjs(convertToValidDateString(receipt?.checkin_time)).format(
                    DATE_FORMAT
                  )
                : ""}
            </span>
          </Form.Item>
          <Form.Item label="Check-out">
            <span className="formItem">
              {receipt?.checkout_time
                ? dayjs(
                    convertToValidDateString(receipt?.checkout_time)
                  ).format(DATE_FORMAT)
                : ""}
            </span>
          </Form.Item>
        </div>
      </div>
      <div>
        <DetailRoomTable dataSource={usedRooms}></DetailRoomTable>
      </div>
      <hr />
      <Row justify={"end"}>
        <Col span={12}>
          <div className="noteTitle">Ghi chú</div>
          <div>{receipt?.note}</div>
        </Col>
        <Col span={7}>
          <div className="itemListContainer">
            <div className="itemList">Tổng tiền phòng: </div>
            <div className="itemList">Tổng tiền dịch vụ</div>
            <div className="itemList">Phụ thu</div>
            <div className="totalTitle">Tổng cộng</div>
          </div>
        </Col>
        <Col span={5}>
          <div className="priceList">
            {receipt?.rent_cost ? receipt?.rent_cost.toLocaleString() : 0}
          </div>
          <div className="priceList">
            {receipt?.service_cost ? receipt.service_cost.toLocaleString() : 0}
          </div>
          <div className="priceList">
            {receipt?.surcharge ? receipt.surcharge.toLocaleString() : "0"}
          </div>
          <div className="totalText">
            {receipt?.total_cost ? receipt.total_cost.toLocaleString() : 0}
          </div>
        </Col>
      </Row>
    </div>
  );

  function convertToValidDateString(date) {
    return date.replace("T", " ");
  }
};

export default DetailForm;
