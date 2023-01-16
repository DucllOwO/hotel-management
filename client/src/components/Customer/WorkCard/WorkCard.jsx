import React from "react";
import styled from "styled-components";
import { AuditOutlined } from "@ant-design/icons";

const WorkCardContainer = styled.div`
  display: flex;
  background-color: var(--black);
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 22%;
  aspect-ratio: 1;
  padding: 20px 10px;
`;

const ReverseWorkCardContainer = styled.div`
  display: flex;
  background-color: var(--primary-color);
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 22%;
  aspect-ratio: 1;
  padding: 20px 10px;
`;

const Circle = styled.div`
  width: 30%;
  height: 30%;
  background-color: var(--primary-color);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
`;

const ReverseCircle = styled.div`
  width: 30%;
  height: 30%;
  background-color: var(--black);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
`;

const Title = styled.div`
  font-size: var(--fs-32);
  font-weight: var(--fw-bold);
  color: var(--primary-color);
`;

const ReverseTitle = styled.div`
  font-size: var(--fs-32);
  font-weight: var(--fw-bold);
  color: var(--black);
`;

const Content = styled.div`
  font-size: var(--fs-18);
  color: var(--grey);
  text-align: center;
`;

const ReverseContent = styled.div`
  font-size: var(--fs-18);
  color: var(--black);
  text-align: center;
`;

const ReWorkCardContainer = styled.div``;

const WorkCard = ({ reverse }) => {
  if (reverse === true) {
    return (
      <ReverseWorkCardContainer>
        <ReverseCircle>
          <AuditOutlined
            style={{ fontSize: "170%", color: "white" }}
          ></AuditOutlined>
        </ReverseCircle>
        <ReverseTitle>BOOKING</ReverseTitle>
        <ReverseContent>
          Booking your own room online and capture your screen
        </ReverseContent>
      </ReverseWorkCardContainer>
    );
  } else {
    return (
      <WorkCardContainer>
        <Circle>
          <AuditOutlined style={{ fontSize: "170%" }}></AuditOutlined>
        </Circle>
        <Title>BOOKING</Title>
        <Content>Booking your own room online and capture your screen</Content>
      </WorkCardContainer>
    );
  }
};

export default WorkCard;
