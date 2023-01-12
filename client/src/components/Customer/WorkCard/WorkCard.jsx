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

const Title = styled.div`
  font-size: var(--fs-32);
  font-weight: var(--fw-bold);
  color: var(--primary-color);
`;

const Content = styled.div`
  font-size: var(--fs-18);
  color: var(--grey);
  text-align: center;
`;

const Icon = styled.div`
  width: 80%;
  height: 80%;
`;

const WorkCard = () => {
  return (
    <WorkCardContainer>
      <Circle>
        <AuditOutlined></AuditOutlined>
      </Circle>
      <Title>BOOKING</Title>
      <Content>Booking your own room online and capture your screen</Content>
    </WorkCardContainer>
  );
};

export default WorkCard;
