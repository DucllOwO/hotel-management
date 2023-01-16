import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import Logo from "../../../assets/images/navBarLogo.png";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  height: 100px;
  position: relative;
`;

const LogoImg = styled.img`
  width: 150px;
  object-fit: cover;
`;

const NavBar = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-14);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PageItem = styled.div`
  font-weight: var(--fw-bold);
  font-size: var(--fs-14);
  color: var(--grey);
  margin: 0 10px;
  cursor: pointer;
`;

const Bullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--grey);
`;

const Buttons = styled.div`
  font-size: var(--fs-14);
  font-weight: var(--fw-bold);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.div`
  color: var(--black);
  margin-right: 10px;
  cursor: pointer;
`;

const SignUpButton = styled.div`
  color: var(--primary-color);
  background-color: var(--black);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const TopBar = () => {
  return (
    <TopBarContainer>
      <LogoImg src={Logo} />
      <NavBar>
        <PageItem>TRANG CHỦ</PageItem>
        <Bullet></Bullet>
        <PageItem>ĐẶT PHÒNG</PageItem>
        <Bullet></Bullet>
        <PageItem>CHI NHÁNH</PageItem>
        <Bullet></Bullet>
        <PageItem>ĐÁNH GIÁ</PageItem>
      </NavBar>
      <Buttons>
        <LoginButton>Log in</LoginButton>
        <SignUpButton>Sign up</SignUpButton>
      </Buttons>
    </TopBarContainer>
  );
};

export default TopBar;
