import React from "react";
import styled from "styled-components";
import SocialMediaImage from "../../../assets/images/SocialMedia.png";

const FooterContainer = styled.div`
  height: fit-content;
  background-color: var(--black);
  width: 100%;
  margin-top: 40px;
  color: var(--primary-color);
`;

const InformationContainer = styled.div`
  display: flex;
  height: 80%;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const HotelInformation = styled.div`
  flex: 2;
  padding: 20px 20px;
`;

const HotelName = styled.div`
  font-weight: var(--fw-bold);
  font-size: var(--fs-18);
`;

const Slogan = styled.div`
  font-weight: var(--fw-normal);
  font-size: var(--fs-14);
  margin-top: 15px;
`;

const SocialMedia = styled.img`
  width: 40%;
  object-fit: contain;
  margin-top: 15px;
`;

const About = styled.div`
  flex: 1;
  padding: 20px 20px;
`;
const Services = styled.div`
  flex: 1;
  padding: 20px 20px;
`;
const Personal = styled.div`
  flex: 1;
  padding: 20px 20px;
`;

const Title = styled.div`
  font-size: var(--fs-24);
  font-weight: var(--fw-bold);
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const SubTitle = styled.div`
  font-size: var(--fs-18);
  color: var(--primary-color);
  margin-top: 8px;
  cursor: pointer;
`;

const CopyRightContainer = styled.div`
  font-size: 10px;
  color: var(--primary-color);
  margin-top: 15px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PrivaryContainer = styled.div`
  display: flex;
`;

const CopyRightButton = styled.div`
  cursor: pointer;
  margin-right: 20px;
`;

const CopyRight = styled.div``;

const Footer = () => {
  return (
    <FooterContainer>
      <InformationContainer>
        <HotelInformation>
          <HotelName>Parallel Shine</HotelName>
          <Slogan>Luxury is not a place, it's an experience.</Slogan>
          <SocialMedia src={SocialMediaImage}></SocialMedia>
        </HotelInformation>
        <About>
          <Title>About us</Title>
          <SubTitle>About us</SubTitle>
          <SubTitle>Branches</SubTitle>
          <SubTitle>Blog</SubTitle>
        </About>
        <Services>
          <Title>Services</Title>
          <SubTitle>Booking</SubTitle>
        </Services>
        <Personal>
          <Title>Personal</Title>
          <SubTitle>Your account</SubTitle>
          <SubTitle>History</SubTitle>
          <SubTitle>Log out</SubTitle>
        </Personal>
      </InformationContainer>
      <hr />
      <CopyRightContainer>
        <CopyRight>
          Copy right 2022 University of Information Technology Reserved
        </CopyRight>
        <PrivaryContainer>
          <CopyRightButton>Privacy</CopyRightButton>
          <CopyRightButton>Team of Services</CopyRightButton>
        </PrivaryContainer>
      </CopyRightContainer>
    </FooterContainer>
  );
};

export default Footer;
