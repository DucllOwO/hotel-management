import React from "react";
import styled from "styled-components";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CircleButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const Badge = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  border: none;
  background-color: rgba(192, 192, 192, 1);
  position: absolute;
  margin-left: 45px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const Container = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 999;
  cursor: pointer;
`;

const FloatingButton = ({ numberOfItem = 0 }) => {
  return (
    <Container>
      <Badge>{numberOfItem}</Badge>
      <CircleButton>
        <ShoppingCartOutlined style={{ fontSize: 30 }} />
      </CircleButton>
    </Container>
  );
};

export default FloatingButton;
