import React, { useState } from "react";
import { Button } from "antd";
import Slider from "./Slider/Slider";
import styled from "styled-components";
import TopBar from "../../../components/Customer/TopBar/TopBar";
import Services from "./Services/Services";
import Branches from "./Branches/Branches";
import Work from "./Work/Work";
import Footer from "../../../components/Customer/Footer/Footer";
import { SearchOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSlick from "react-slick";

const MainHome = styled.div`
  background-color: var(--customer-background);
`;

const HomeContainer = styled.div`
  width: 100%;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none;
  /* background-color: var(--customer-background); */
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 75px;
  @media (max-width: 768px) {
    padding-bottom: 30px;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: none;
  width: 80%;
  margin-top: 30px;
  padding: 0 30px;
  justify-content: flex-start;
  @media (max-width: 767px) {
    display: block;
  }
`;

const Welcome = styled.div`
  font-size: var(--fs-40);
  font-weight: var(--fw-bold);
  color: var(--black);
`;

const HotelName = styled.div`
  font-size: var(--fs-40);
  font-weight: var(--fw-bold);
  color: var(--black);
`;

const Slogan = styled.div`
  color: var(--black);
  font-size: var(--fs-24);
  font-weight: var(--fw-normal);
  margin-top: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  border-radius: 20px;
  margin-top: 30px;
  /* background-color: var(--grey); */
  border: 1.5px solid black;
  width: 100%;
  margin-bottom: 30px;
  height: 60px;
`;

const SearchInput = styled.input`
  width: 70%;
  outline: none;
  border: 0;
  background-color: transparent;
  color: var(--black);
  font-size: var(--fs-18);
  padding-left: 10px;
  &::placeholder {
    color: var(--dark-grey);
  }
`;

const SliderSlickContainer = styled.div`
  width: 100%;
`;

const ButtonOutline = styled.div`
  border-radius: 30px;
  height: fit-content;
  max-width: 200px;
  margin: 0 10px;
`;

const OfferButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid black;
  padding: 0 20px;
  border-radius: 30px;
  height: 30px;
  width: fit-content;
  font-size: var(--fs-14);
  font-weight: var(--fw-bold);
  &.active {
    background-color: var(--black);
    color: var(--primary-color);
  }
`;

const OfferText = styled.div`
  font-size: var(--fs-18);
  font-weight: var(--fw-bold);
  color: var(--black);
  margin-top: 30px;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OfferImage = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 30px;
`;

const Home = () => {
  const [offer, setOffer] = useState(0);

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <MainHome>
      <TopBar />
      <HomeContainer>
        <SliderContainer>
          <Slider></Slider>
          <MobileContainer>
            <Welcome>Welcome to </Welcome>
            <HotelName>Parallel Shine</HotelName>
            <Slogan>Let's enjoy your life</Slogan>
            <SearchContainer>
              <SearchOutlined
                style={{
                  fontSize: "30px",
                  color: "#707070",
                  paddingLeft: "10px",
                }}
              ></SearchOutlined>
              <SearchInput placeholder="search here..."></SearchInput>
            </SearchContainer>

            <SliderSlickContainer>
              <SliderSlick {...settings}>
                <ButtonOutline
                  onClick={() => {
                    setOffer(0);
                  }}
                >
                  <OfferButton className={offer === 0 ? "active" : ""}>
                    Top rates
                  </OfferButton>
                </ButtonOutline>
                <ButtonOutline
                  onClick={() => {
                    setOffer(1);
                  }}
                >
                  <OfferButton className={offer === 1 ? "active" : ""}>
                    Best offers
                  </OfferButton>
                </ButtonOutline>
                <ButtonOutline
                  onClick={() => {
                    setOffer(2);
                  }}
                >
                  <OfferButton className={offer === 2 ? "active" : ""}>
                    Popular
                  </OfferButton>
                </ButtonOutline>
                <ButtonOutline
                  onClick={() => {
                    setOffer(3);
                  }}
                >
                  <OfferButton className={offer === 3 ? "active" : ""}>
                    Booked
                  </OfferButton>
                </ButtonOutline>
              </SliderSlick>

              <OfferText>
                {offer === 0
                  ? "Top rates"
                  : offer === 1
                  ? "Best offers"
                  : offer === 2
                  ? "Popular"
                  : "Booked"}
              </OfferText>

              <SliderSlick {...settings1}>
                <ImageContainer>
                  <OfferImage src="https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg"></OfferImage>
                </ImageContainer>
                <ImageContainer>
                  <OfferImage src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"></OfferImage>
                </ImageContainer>
                <ImageContainer>
                  <OfferImage src="https://www.travelandleisure.com/thmb/hKAApndt2eCPmDbcswLyQTKKwIA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/prince-de-galles-lalique-suite-LUXESUITE0122-eab91d3e620c4d939cd168c6319ff980.jpg"></OfferImage>
                </ImageContainer>
                <ImageContainer>
                  <OfferImage src="https://t4.ftcdn.net/jpg/01/72/36/17/360_F_172361703_znZIvSiPTVUI1ykGWt2SQBpENgYeDT32.jpg"></OfferImage>
                </ImageContainer>
                <ImageContainer>
                  <OfferImage src="https://cms-assets.jung.de/cms/media/89/8922/980x496/standard/CA321-18-ver.jpg"></OfferImage>
                </ImageContainer>
                <ImageContainer>
                  <OfferImage src="https://amazingarchitecture.com/storage/1827/black_house_amin_moazzen_bangal_india.jpg"></OfferImage>
                </ImageContainer>
              </SliderSlick>
            </SliderSlickContainer>
          </MobileContainer>
        </SliderContainer>
      </HomeContainer>
      <Services></Services>
      <Branches></Branches>
      <Work></Work>
      <Footer></Footer>
    </MainHome>
  );
};

export default Home;
