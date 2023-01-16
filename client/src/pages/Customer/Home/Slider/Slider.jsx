import React from "react";
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
`;

const CenterButtonFirst = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 33.4%;
  justify-content: center;
  background-color: var(--black);
  color: var(--primary-color);
  cursor: pointer;
  border-radius: 20px 0 0 0;
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
`;

const ButtonLabel = styled.div`
  font-size: var(--fs-18);
  margin-left: 10px;
`;

const CenterDetails = styled.div`
  width: 100%;
  height: 70%;
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
`;

const AddressLabel = styled.div`
  color: var(--grey);
`;

const Address = styled.div`
  font-size: 15px;
  margin-top: 3px;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 80%;
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
  height: 55%;
  aspect-ratio: 1;
  background-color: var(--black);
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = () => {
  return (
    <SliderContainer>
      <BlackBackground>
        <Name>Parallel Shine</Name>
      </BlackBackground>

      <CenterBarContainer>
        <CenterNav>
          <CenterButtonFirst>
            <HomeOutlined></HomeOutlined>
            <ButtonLabel>Stay</ButtonLabel>
          </CenterButtonFirst>
          <CenterButtonSecond>
            <StarOutlined></StarOutlined>
            <ButtonLabel>Reviews</ButtonLabel>
          </CenterButtonSecond>
          <CenterButtonLast>
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

          <SearchButton>
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
