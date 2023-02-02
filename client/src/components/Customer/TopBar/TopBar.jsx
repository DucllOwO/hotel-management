import { Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../../assets/images/navBarLogo.png";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  height: 12vh;
  position: relative;
  background-color: var(--customer-background);
  @media (max-width: 768px) {
    background-color: var(--black);
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 20px;
    height: 10vh;
  }
  @media (max-width: 640px) {
    height: 8vh;
    position: sticky;
    top: 0;
  }
`;

const LogoImg = styled.img`
  width: 150px;
  object-fit: cover;
  @media (max-width: 820px) {
    width: 100px;
  }
`;

const NavBar = styled.ul`
  /* display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-14);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;
  @media (max-width: 768px) {
    padding-top: 10vh;
    position: fixed;
    top: 10vh;
    width: 100%;
    height: 300px;
    background-color: var(--black);
    border-radius: 0 0 20px 20px;
    z-index: 10;
    flex-direction: column;
    justify-content: space-around;
  } */
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    position: fixed;
    top: 10vh;
    right: 0;
    width: 100%;
    height: 30vh;
    background-color: var(--black);
    z-index: 10;
    flex-direction: column;
    border-radius: 0 0 50px 50px;
    transform: translateX(100%);
  }
  @media (max-width: 640px) {
    top: 8vh;
  }
  /* active {
    transform: translateX(0);
  } */
`;

const NavBarActive = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    position: fixed;
    top: 10vh;
    right: 0;
    width: 100%;
    height: 30vh;
    background-color: var(--black);
    z-index: 10;
    flex-direction: column;
    border-radius: 0 0 50px 50px;
    transform: translateX(0);
  }
  @media (max-width: 640px) {
    top: 8vh;
  }
`;

const PageItem = styled.div`
  font-weight: var(--fw-bold);
  font-size: var(--fs-14);
  color: var(--grey);
  margin: 0 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: var(--fs-14);
    color: var(--dark-grey);
  }
  &.active {
    color: var(--black);
    @media (max-width: 768px) {
      color: var(--primary-color);
    }
  }
`;

const Bullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--grey);
  @media (max-width: 768px) {
    display: none;
  }
`;

const Buttons = styled.div`
  font-size: var(--fs-14);
  font-weight: var(--fw-bold);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.div`
  color: var(--black);
  margin-right: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SignUpButton = styled.div`
  color: var(--primary-color);
  background-color: var(--black);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavToggler = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
    color: var(--primary-color);
    z-index: 100;
  }
`;

const FloatButton = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: var(--dark-grey);
  position: fixed;
  bottom: 20px;
  right: 0;
  display: none;
  color: white;
  @media (max-width: 768px) {
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-32);
  }
  @media (max-width: 640px) {
    display: flex;
    height: 70px;
    width: 70px;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-32);
  }
`;

const TopBar = () => {
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(true);
  const navToggle = () => {
    active ? setActive(false) : setActive(true);
  };

  return active ? (
    <TopBarContainer>
      <LogoImg src={Logo} />
      <NavBar>
        <PageItem
          className={page === 0 ? "active" : ""}
          onClick={() => {
            setPage(0);
          }}
        >
          HOME
        </PageItem>
        <Bullet></Bullet>
        <PageItem
          className={page === 1 ? "active" : ""}
          onClick={() => {
            setPage(1);
          }}
        >
          BOOKING
        </PageItem>
        <Bullet></Bullet>
        <PageItem
          className={page === 2 ? "active" : ""}
          onClick={() => {
            setPage(2);
          }}
        >
          BRANCHES
        </PageItem>
        <Bullet></Bullet>
        <PageItem
          className={page === 3 ? "active" : ""}
          onClick={() => {
            setPage(3);
          }}
        >
          REVIEW
        </PageItem>
      </NavBar>
      <Buttons>
        <LoginButton>Log in</LoginButton>
        <SignUpButton>Sign up</SignUpButton>
      </Buttons>
      <NavToggler onClick={navToggle}>
        <MenuOutlined></MenuOutlined>
      </NavToggler>
      <FloatButton>
        <LoginOutlined></LoginOutlined>
      </FloatButton>
    </TopBarContainer>
  ) : (
    <TopBarContainer>
      <LogoImg src={Logo} />
      <NavBarActive>
        <PageItem
          className={page === 0 ? "active" : ""}
          onClick={() => {
            setPage(0);
          }}
        >
          HOME
        </PageItem>
        <Bullet></Bullet>
        <PageItem
          className={page === 1 ? "active" : ""}
          onClick={() => {
            setPage(1);
          }}
        >
          BOOKING
        </PageItem>
        <Bullet></Bullet>
        <PageItem
          className={page === 2 ? "active" : ""}
          onClick={() => {
            setPage(2);
          }}
        >
          BRANCHES
        </PageItem>
        <Bullet></Bullet>
        <PageItem
          className={page === 3 ? "active" : ""}
          onClick={() => {
            setPage(3);
          }}
        >
          REVIEW
        </PageItem>
      </NavBarActive>
      <Buttons>
        <LoginButton
          onClick={() => {
            console.log("first")
            console.log("first")
          }}
        >Log in</LoginButton>
        <SignUpButton>Sign up</SignUpButton>
      </Buttons>
      <NavToggler onClick={navToggle}>
        <MenuOutlined></MenuOutlined>
      </NavToggler>
      <FloatButton>
        <LoginOutlined></LoginOutlined>
      </FloatButton>
    </TopBarContainer>
  );
};

export default TopBar;
