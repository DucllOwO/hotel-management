import React, { useEffect, useState } from "react";
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
import { Image } from "antd";

const SliderContainer = styled.div`
  width: 80%;
  height: 70vh;
  border-radius: 40px;
  position: relative;
  margin-top: 50px;
  background-repeat: no-repeat;
  background-size: cover;
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

const ImageItem = styled.div`
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

  &.choose {
    background-color: black;
    transform: scale(1.5);
  }
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

const dataSlider = [
  {
    address: "23 Fansipan, Lao Cai",
    images: [
      "https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg",
      "https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg",
      "https://www.travelandleisure.com/thmb/hKAApndt2eCPmDbcswLyQTKKwIA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/prince-de-galles-lalique-suite-LUXESUITE0122-eab91d3e620c4d939cd168c6319ff980.jpg",
      "https://t4.ftcdn.net/jpg/01/72/36/17/360_F_172361703_znZIvSiPTVUI1ykGWt2SQBpENgYeDT32.jpg",
    ],
    mainBackground:
      "https://cms-assets.jung.de/cms/media/89/8922/980x496/standard/CA321-18-ver.jpg ",
  },
  {
    address: "03 Vo Nguyen Giap, Da Nang",
    images: [
      "https://t4.ftcdn.net/jpg/01/72/36/17/360_F_172361703_znZIvSiPTVUI1ykGWt2SQBpENgYeDT32.jpg",
      "https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg",
      "https://www.travelandleisure.com/thmb/hKAApndt2eCPmDbcswLyQTKKwIA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/prince-de-galles-lalique-suite-LUXESUITE0122-eab91d3e620c4d939cd168c6319ff980.jpg",
      "https://t4.ftcdn.net/jpg/01/72/36/17/360_F_172361703_znZIvSiPTVUI1ykGWt2SQBpENgYeDT32.jpg",
    ],
    mainBackground:
      "https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg",
  },
  {
    address: "2002, Cong Hoa, Sai Gon",
    images: [
      "https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg",
      "https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg",
      "https://www.travelandleisure.com/thmb/hKAApndt2eCPmDbcswLyQTKKwIA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/prince-de-galles-lalique-suite-LUXESUITE0122-eab91d3e620c4d939cd168c6319ff980.jpg",
      "https://t4.ftcdn.net/jpg/01/72/36/17/360_F_172361703_znZIvSiPTVUI1ykGWt2SQBpENgYeDT32.jpg",
    ],
    mainBackground:
      "https://www.travelandleisure.com/thmb/hKAApndt2eCPmDbcswLyQTKKwIA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/prince-de-galles-lalique-suite-LUXESUITE0122-eab91d3e620c4d939cd168c6319ff980.jpg",
  },
  {
    address: "2023 Nguyen Van Cu, Can Tho",
    images: [
      "https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg",
      "https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg",
      "https://www.travelandleisure.com/thmb/hKAApndt2eCPmDbcswLyQTKKwIA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/prince-de-galles-lalique-suite-LUXESUITE0122-eab91d3e620c4d939cd168c6319ff980.jpg",
      "https://t4.ftcdn.net/jpg/01/72/36/17/360_F_172361703_znZIvSiPTVUI1ykGWt2SQBpENgYeDT32.jpg",
    ],
    mainBackground:
      "https://amazingarchitecture.com/storage/files/1/architecture-firms/amin-moazzen/black-fly/black_house_amin_moazzen_bangal_india-5.jpg",
  },
];

const Slider = () => {
  const [search, setSearch] = useState(false);
  const [isChosen, setIsChosen] = useState(0);
  const [countCarousel, setCountCarousel] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCountCarousel((prev) => {
        const temp = prev + 1;
        console.log(prev);
        if (temp >= 4) return 0;
        return temp;
      });
    }, 10000);
  }, []);

  return (
    <SliderContainer
      style={{
        backgroundImage: `url(${dataSlider[countCarousel].mainBackground})`,
      }}
    >
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
            <ButtonLabel>Rating</ButtonLabel>
          </CenterButtonSecond>
          <CenterButtonLast
            isChosen={isChosen}
            onClick={() => {
              setIsChosen(2);
            }}
          >
            <AppstoreAddOutlined></AppstoreAddOutlined>
            <ButtonLabel>Facilities</ButtonLabel>
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
            <Address>{dataSlider[countCarousel].address}</Address>
          </CenterAddress>

          {search && isChosen === 0 ? (
            <Search>
              <SearchInput placeholder="Search here..."></SearchInput>
            </Search>
          ) : isChosen === 0 ? (
            <ImageList>
              <ImageItem>
                <Image
                  src={dataSlider[countCarousel].images[0]}
                  // width={100}
                  style={{ borderRadius: "15px" }}
                ></Image>
              </ImageItem>
              <ImageItem>
                <Image
                  src={dataSlider[countCarousel].images[1]}
                  // width={100}
                  style={{ borderRadius: "15px" }}
                ></Image>
              </ImageItem>
              <ImageItem>
                <Image
                  src={dataSlider[countCarousel].images[2]}
                  // width={100}
                  style={{ borderRadius: "15px" }}
                ></Image>
              </ImageItem>
              <ImageItem>
                <Image
                  src={dataSlider[countCarousel].images[3]}
                  // width={100}
                  style={{ borderRadius: "15px" }}
                ></Image>
              </ImageItem>
              {/* <ImageItem src={dataSlider[countCarousel].images[0]} alt="" />
              <ImageItem src={dataSlider[countCarousel].images[1]} alt="" />
              <ImageItem src={dataSlider[countCarousel].images[2]} alt="" />
              <ImageItem src={dataSlider[countCarousel].images[3]} alt="" /> */}
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
          <Bullet className={countCarousel === 0 ? "choose" : ""}></Bullet>
          <Bullet className={countCarousel === 1 ? "choose" : ""}></Bullet>
          <Bullet className={countCarousel === 2 ? "choose" : ""}></Bullet>
          <Bullet className={countCarousel === 3 ? "choose" : ""}></Bullet>
        </SliderBullets>
      </CenterBarContainer>
    </SliderContainer>
  );
};

export default Slider;
