import { Image } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const RoomInfoContainer = styled.div`
  background-color: white;
  width: 330px;
  height: 390px;
  border-radius: 30px;
  padding: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1),
    0 3px 6px -4px rgba(0, 0, 0, 0.15), 0 9px 28px 8px rgba(0, 0, 0, 0.1);

  border: ${(props) => (props.isChosen ? "2px solid #C0C0C0" : "none")};
  cursor: pointer;
  @media only screen and (max-width: 960px) {
    width: 280px;
    height: 390px;
  }
`;

const RoomInfo = styled.div`
  font-size: 18px;
  padding: 0 10px;
  margin-top: 15px;
`;

const HeaderRoomInfo = styled.div`
  font-weight: bold;
  margin: 10px 0 15px 0;
`;

const BodyRoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Mask = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 30px;
  z-index: 100;
  background: rgba(217, 217, 217, 1);
  opacity: 0.5;
  position: absolute;

  @media only screen and (max-width: 960px) {
    width: 280px;
    height: 300px;
  }
`;

const Room = ({ name, price, max_customers, bed }) => {
  const [isChosen, setIsChosen] = useState(false);
  return (
    <RoomInfoContainer
      isChosen={isChosen}
      onClick={(e) => setIsChosen((prev) => !prev)}
    >
      {!isChosen ? (
        <Image
          width={"auto"}
          height={300}
          preview={false}
          src="https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
          style={{
            borderRadius: 30,
          }}
        />
      ) : (
        <>
          <Mask></Mask>
          <Image
            width={"auto"}
            height={300}
            preview={false}
            src="https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
            style={{
              borderRadius: 30,
              boxShadow:
                " 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02) ",
              background: "rgba(217, 217, 217, 1)",
            }}
          />
        </>
      )}

      <RoomInfo>
        <HeaderRoomInfo>{name}</HeaderRoomInfo>
        <BodyRoomInfo>
          <span style={{ marginRight: 20 }}>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.7274 17.4471C16.2716 16.1713 15.2672 15.0439 13.8701 14.2399C12.4729 13.4358 10.7611 13 9 13C7.23893 13 5.52706 13.4358 4.12991 14.2399C2.73276 15.0439 1.72839 16.1713 1.27259 17.4471"
                stroke="#C0C0C0"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle
                cx="9"
                cy="5"
                r="4"
                stroke="#C0C0C0"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <span
              style={{
                textAlign: "center",
                margin: "0 0 0 10px",
                fontWeight: "bold",
              }}
            >
              {max_customers}
            </span>
          </span>
          <span>
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11C1 9.13077 1 8.19615 1.40192 7.5C1.66523 7.04394 2.04394 6.66523 2.5 6.40192C3.19615 6 4.13077 6 6 6H16C17.8692 6 18.8038 6 19.5 6.40192C19.9561 6.66523 20.3348 7.04394 20.5981 7.5C21 8.19615 21 9.13077 21 11C21 12.8692 21 13.8038 20.5981 14.5C20.3348 14.9561 19.9561 15.3348 19.5 15.5981C18.8038 16 17.8692 16 16 16H6C4.13077 16 3.19615 16 2.5 15.5981C2.04394 15.3348 1.66523 14.9561 1.40192 14.5C1 13.8038 1 12.8692 1 11Z"
                stroke="#C0C0C0"
                stroke-width="2"
              />
              <path
                d="M18 3C18 1.89543 17.1046 1 16 1H6C4.89543 1 4 1.89543 4 3"
                stroke="#C0C0C0"
                stroke-width="2"
              />
              <path
                d="M18 19C18 20.1046 17.1046 21 16 21H6C4.89543 21 4 20.1046 4 19"
                stroke="#C0C0C0"
                stroke-width="2"
              />
              <rect
                x="4.5"
                y="9.5"
                width="5"
                height="1"
                rx="0.5"
                stroke="#C0C0C0"
              />
            </svg>
            <span
              style={{
                textAlign: "center",
                fontWeight: "bold",
                margin: "0 0 0 10px",
              }}
            >
              {bed}
            </span>
          </span>
          <span
            style={{
              flex: 2,
              textAlign: "right",
              fontWeight: "bold",

              fontSize: 18,
            }}
          >
            {price + "đ"}
          </span>
        </BodyRoomInfo>
      </RoomInfo>
    </RoomInfoContainer>
  );
};

export default Room;
