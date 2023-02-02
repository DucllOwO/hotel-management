import React, { useState } from "react";
import {
  HomeOutlined,
  StarOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  SwapRightOutlined,
  StarFilled,
  WifiOutlined,
  ColumnWidthOutlined,
  CoffeeOutlined,
  SlidersOutlined,
  SkinOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
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
  @media (max-width: 768px) {
    font-size: var(--fs-10);
  }
`;

const Address = styled.div`
  font-size: 15px;
  margin-top: 3px;
  @media (max-width: 1024px) {
    font-size: var(--fs-12);
  }
  @media (max-width: 768px) {
    font-size: var(--fs-11);
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
  @media (max-width: 768px) {
    width: 18%;
    height: 90%;
  }
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
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
  }
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
  @media (max-width: 768px) {
    font-size: var(--fs-18);
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

const RatingContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  font-size: var(--fs-24);
  width: 20%;
`;

const RatingLabel = styled.div`
  font-weight: var(--fw-bold);
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: var(--grey);
  margin-left: 5px;
`;

const CommentContainer = styled.div`
  width: 35%;
  display: flex;
  font-size: var(--fs-24);
  margin-left: 20px;
  align-items: center;
`;

const CommentAva = styled.img`
  width: 70px;
  height: 70px;
  background-size: cover;
  border-radius: 50%;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
  /* background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HGWSrIZjGnlMVh9tlh5wGYsgNZ1hTwqRAg&usqp=CAU"); */
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 4px;
`;

const CommentName = styled.div`
  font-weight: var(--fw-bold);
  color: var(--black);
  font-size: var(--fs-18);
  padding-top: 5px;
  color: var(--grey);
  @media (max-width: 768px) {
    font-size: var(--fs-14);
    margin-top: 10px;
  }
`;

const CommentContent = styled.div`
  font-size: var(--fs-14);
  font-weight: var(--fw-normal);
  padding-top: 10px;
  @media (max-width: 768px) {
    font-size: var(--fs-12);
    padding-top: 2px;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  font-size: var(--fs-18);
  color: var(--black);
  width: 100%;
  height: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: var(--fs-14);
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.6667%;
  justify-content: center;
  align-items: center;
`;

const FeatureName = styled.div`
  font-weight: var(--fw-bold);
  margin-top: 5px;
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

          {isChosen === 0 ? (
            <CenterAddress>
              <AddressLabel>ADDRESS</AddressLabel>
              <Address>120 Trần Phú, Nha Trang</Address>
              <Address>Việt Nam</Address>
            </CenterAddress>
          ) : (
            <div></div>
          )}

          {search && isChosen === 0 ? (
            <Search>
              <SearchInput placeholder="Search here..."></SearchInput>
            </Search>
          ) : isChosen === 0 ? (
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
          ) : (
            <div></div>
          )}

          {isChosen === 0 ? (
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
          ) : (
            <div></div>
          )}

          {isChosen === 1 ? (
            <ReviewContainer>
              <RatingContainer>
                <RatingLabel>4.8</RatingLabel>
                <StarFilled
                  style={{
                    fontSize: "35px",
                    color: "#f5c706",
                    marginLeft: "10px",
                  }}
                ></StarFilled>
              </RatingContainer>
              <VerticalLine></VerticalLine>
              <CommentContainer>
                <CommentAva src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HGWSrIZjGnlMVh9tlh5wGYsgNZ1hTwqRAg&usqp=CAU"></CommentAva>
                <CommentInfo>
                  <CommentName>Lucy</CommentName>
                  <CommentContent>Beautiful view, modern rooms</CommentContent>
                </CommentInfo>
              </CommentContainer>
              <VerticalLine></VerticalLine>
              <CommentContainer>
                <CommentAva src="https://www.studytienganh.vn/upload/2022/08/114992.png"></CommentAva>
                <CommentInfo>
                  <CommentName>Jenifer</CommentName>
                  <CommentContent>A good choice for its price</CommentContent>
                </CommentInfo>
              </CommentContainer>
            </ReviewContainer>
          ) : (
            <div></div>
          )}

          {isChosen === 2 ? (
            <FeaturesContainer>
              <FeatureItem>
                <ColumnWidthOutlined
                  style={{ fontSize: "35px" }}
                ></ColumnWidthOutlined>
                <FeatureName>Parking</FeatureName>
              </FeatureItem>
              <VerticalLine></VerticalLine>
              <FeatureItem>
                <WifiOutlined style={{ fontSize: "35px" }}></WifiOutlined>
                <FeatureName>Wifi</FeatureName>
              </FeatureItem>
              <VerticalLine></VerticalLine>
              <FeatureItem>
                <CoffeeOutlined style={{ fontSize: "35px" }}></CoffeeOutlined>
                <FeatureName>Breakfast</FeatureName>
              </FeatureItem>
              <VerticalLine></VerticalLine>
              <FeatureItem>
                <SlidersOutlined style={{ fontSize: "35px" }}></SlidersOutlined>
                <FeatureName>Fitness</FeatureName>
              </FeatureItem>
              <VerticalLine></VerticalLine>
              <FeatureItem>
                <SkinOutlined style={{ fontSize: "35px" }}></SkinOutlined>
                <FeatureName>Wahsing</FeatureName>
              </FeatureItem>
              <VerticalLine></VerticalLine>
              <FeatureItem>
                <TransactionOutlined
                  style={{ fontSize: "35px" }}
                ></TransactionOutlined>
                <FeatureName>Exchange</FeatureName>
              </FeatureItem>
            </FeaturesContainer>
          ) : (
            <div></div>
          )}
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
