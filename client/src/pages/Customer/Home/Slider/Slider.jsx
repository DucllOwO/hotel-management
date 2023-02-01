import React, { useState } from "react";
import {
  HomeOutlined,
  StarOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: 80%;
  height: 70vh;
  background-image: url("https://media.cntraveler.com/photos/53da8c106dec627b149f1e4d/master/pass/one-only-the-palm-dubai-dubai-united-arab-emirates-112572-1.jpg");
  border-radius: 40px;
  position: relative;
  margin-top: 50px;
  @media (max-width: 820px) {
    height: 30vh;
    margin-top: 0px;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

const BlackBackground = styled.div`
  width: 34%;
  height: 100%;
  background-color: var(--black);
  border-radius: 40px 0 0 40px;
`;

const Name = styled.div`
  font-size: var(--fs-60);
  color: var(--primary-color);
  padding-left: 40px;
  padding-top: 40px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  @media (max-width: 820px) {
    font-size: var(--fs-40);
  }
`;

const CenterBarContainer = styled.div`
  height: 150px;
  width: 90%;
  position: absolute;
  bottom: -15%;
  left: 50%;
  transform: translate(-50%, -0%);
`;

const CenterNav = styled.div`
  width: 50%;
  height: 30%;
  display: flex;
  font-size: var(--fs-18);
  font-weight: var(--fw-bold);
  justify-content: space-between;
  align-items: center;
  @media (max-width: 820px) {
    font-size: var(--fs-14);
  }
`;

const CenterButtonFirst = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 33.4%;
  justify-content: center;
  /* background-color: var(--black);
  color: var(--primary-color); */
  cursor: pointer;
  border-radius: 20px 0 0 0;
  background-color: ${(props) =>
    props.isChosen === 0 ? "var(--primary-color)" : "var(--black)"};
  color: ${(props) =>
    props.isChosen === 0 ? "var(--black)" : "var(--primary-color)"};
`;
const CenterButtonSecond = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 33.4%;
  justify-content: center;
  background-color: var(--black);
  color: var(--primary-color);
  cursor: pointer;
  background-color: ${(props) =>
    props.isChosen === 1 ? "var(--primary-color)" : "var(--black)"};
  color: ${(props) =>
    props.isChosen === 1 ? "var(--black)" : "var(--primary-color)"};
`;

const CenterButtonLast = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 33.4%;
  justify-content: center;
  background-color: var(--black);
  color: var(--primary-color);
  cursor: pointer;
  border-radius: 0 20px 0 0;
  background-color: ${(props) =>
    props.isChosen === 2 ? "var(--primary-color)" : "var(--black)"};
  color: ${(props) =>
    props.isChosen === 2 ? "var(--black)" : "var(--primary-color)"};
`;

const ButtonLabel = styled.div`
  font-size: var(--fs-18);
  margin-left: 10px;
  @media (max-width: 820px) {
    font-size: var(--fs-14);
  }
`;

const CenterDetails = styled.div`
  /* width: 100%; */
  height: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 0 20px 20px 20px;
  justify-content: space-between;
  padding: 0 30px;
  position: relative;
  padding-bottom: 30px;
`;

const DetailButton = styled.div`
  position: absolute;
  width: 18%;
  height: 35%;
  background-color: var(--black);
  bottom: -20%;
  right: 5%;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DetailLabel = styled.div`
  margin-left: 10px;
  font-size: var(--fs-14);
  font-weight: var(--fw-bold);
  color: var(--primary-color);
`;

const CenterAddress = styled.div`
  width: 25%;
  height: 80%;
  padding: 6px 5px;
  font-weight: var(--fw-bold);
  border: 1px solid var(--grey);
  border-radius: 10px;
  font-size: var(--fs-12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;

const AddressLabel = styled.div`
  color: var(--grey);
  @media (max-width: 1024px) {
    font-size: var(--fs-12);
  }
`;

const Address = styled.div`
  font-size: 15px;
  margin-top: 3px;
  @media (max-width: 1024px) {
    font-size: var(--fs-12);
  }
`;

const ImageList = styled.div`
  /* display: flex; */
  flex-direction: row;
  width: 60%;
  height: 80%;
  display: ${(props) => (props.search ? "none" : "flex")};
`;

const ImageItem = styled.img`
  width: 22%;
  aspect-ratio: 1;
  margin: 0 10px;
  border-radius: 15px;
  cursor: pointer;
`;

const SliderBullets = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
  margin-top: 10px;
`;

const Bullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--grey);
  margin-right: 10px;
`;

const SearchButton = styled.div`
  height: 70%;
  aspect-ratio: 1;
  background-color: var(--black);
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.div`
  width: 60%;
  height: 60%;
  border-radius: 20px;
  border: 1px solid black;
  margin-top: 10px;
  display: flex;
  align-items: center;
  /* display: ${(props) => (props.search ? "flex" : "none")}; */
`;

const SearchInput = styled.input`
  font-size: var(--fs-24);
  width: 100%;
  outline: none;
  border: 0;
  margin: 0 5px;
  padding-left: 10px;
  transition: 5s;
`;

const Slider = () => {
  const [search, setSearch] = useState(false);
  const [isChosen, setIsChosen] = useState(0);

  return (
    <SliderContainer>
      <BlackBackground>
        <Name>Parallel Shine</Name>
      </BlackBackground>

      <CenterBarContainer>
        <CenterNav>
          <CenterButtonFirst
            isChosen={isChosen}
            onClick={() => {
              setIsChosen(0);
            }}
          >
            <HomeOutlined></HomeOutlined>
            <ButtonLabel>Stay</ButtonLabel>
          </CenterButtonFirst>
          <CenterButtonSecond
            isChosen={isChosen}
            onClick={() => {
              setIsChosen(1);
            }}
          >
            <StarOutlined></StarOutlined>
            <ButtonLabel>Reviews</ButtonLabel>
          </CenterButtonSecond>
          <CenterButtonLast
            isChosen={isChosen}
            onClick={() => {
              setIsChosen(2);
            }}
          >
            <AppstoreAddOutlined></AppstoreAddOutlined>
            <ButtonLabel>Features</ButtonLabel>
          </CenterButtonLast>
        </CenterNav>

        <CenterDetails>
          <DetailButton>
            <DetailLabel>Detail</DetailLabel>
            <SwapRightOutlined
              style={{ fontSize: "150%", color: "white", marginLeft: "5px" }}
            ></SwapRightOutlined>
          </DetailButton>
          <CenterAddress>
            <AddressLabel>ADDRESS</AddressLabel>
            <Address>120 Trần Phú, Nha Trang</Address>
            <Address>Việt Nam</Address>
          </CenterAddress>

          {search ? (
            <Search>
              <SearchInput placeholder="Search here..."></SearchInput>
            </Search>
          ) : (
            <ImageList>
              <ImageItem
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
                alt=""
              />
              <ImageItem
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
                alt=""
              />
              <ImageItem
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
                alt=""
              />
              <ImageItem
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGH5HQBLQoO6d_sEmWbzi-kLrZ2ITCaSyRw&usqp=CAU"
                alt=""
              />
            </ImageList>
          )}

          <SearchButton
            onClick={() => {
              setSearch((pre) => {
                return !pre;
              });
            }}
          >
            <SearchOutlined
              style={{ color: "white", fontSize: "180%" }}
            ></SearchOutlined>
          </SearchButton>
        </CenterDetails>

        <SliderBullets>
          <Bullet></Bullet>
          <Bullet></Bullet>
          <Bullet></Bullet>
          <Bullet></Bullet>
        </SliderBullets>
      </CenterBarContainer>
    </SliderContainer>
  );
};

export default Slider;
