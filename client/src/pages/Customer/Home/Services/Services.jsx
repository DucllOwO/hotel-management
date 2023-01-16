import React from "react";
import styled from "styled-components";

const ServiceContainer = styled.div`
  justify-content: space-between;
  padding: 0 60px;
  margin-top: 100px;
`;
const ServicesContainer = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 23%;
`;

const WhatWeServeContainer = styled.div`
  display: flex;
  font-size: var(--fs-28);
  color: var(--primary-color);
  align-items: center;
  font-weight: var(--fw-bold);
`;

const What = styled.div`
  color: var(--black);
`;

const WeServe = styled.div`
  margin-left: 2px;
  padding: 3px;
  background-color: var(--black);
`;

const TopValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: var(--fs-40);
  font-weight: var(--fw-bold);
  color: var(--black);
  height: 60%;
`;

const Content = styled.span`
  font-size: var(--fs-18);
  color: var(--grey);
  margin-top: 10px;
`;

const ChoicesImage = styled.img`
  width: 60%;
  height: 60%;
  object-fit: contain;
`;

const Title = styled.div`
  font-size: var(--fs-24);
  font-weight: var(--fw-bold);
  margin-top: 10px;
`;

const BestViews = styled.div``;

const Services = () => {
  return (
    <ServiceContainer>
      <WhatWeServeContainer>
        <What>WHAT</What>
        <WeServe> WE SERVE</WeServe>
      </WhatWeServeContainer>
      <ServicesContainer>
        <Container>
          <TopValuesContainer>
            <span>Top Values</span>
            <span>For You</span>
          </TopValuesContainer>
          <Content>Try a variety of benifits when using our services</Content>
        </Container>

        <Container>
          <ChoicesImage src="https://bestanimations.com/media/color-full-earth/152469542globe-earth-animation-15-2.gif" />
          <Title>Lots of Choices</Title>
          <Content>Total 20 branches and many kind of rooms</Content>
        </Container>
        <Container>
          <ChoicesImage src="https://images.squarespace-cdn.com/content/v1/55b3b4afe4b0a813f74ebbd8/1660144979487-OWQLJQ36USA2G45F7I7T/04_rainbow.gif?format=1500w" />
          <Title>Best Views</Title>
          <Content>Total 20 branches and many kind of rooms</Content>
        </Container>
        <Container>
          <ChoicesImage src="https://media3.giphy.com/media/AQFPfGy3znoB7F2WoB/giphy.gif?cid=6c09b9523300qdtt14jsw82ro72a1tgorc25v1eynrtc02sz&rid=giphy.gif&ct=s" />
          <Title>Good Price</Title>
          <Content>Total 20 branches and many kind of rooms</Content>
        </Container>
      </ServicesContainer>
    </ServiceContainer>
  );
};

export default Services;
