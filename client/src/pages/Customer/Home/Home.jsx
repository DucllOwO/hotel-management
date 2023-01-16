import React from "react";
import { Button } from "antd";
import Slider from "./Slider/Slider";
import styled from "styled-components";
import TopBar from "../../../components/Customer/TopBar/TopBar";
import Services from "./Services/Services";
import Branches from "./Branches/Branches";
import Work from "./Work/Work";
import Footer from "../../../components/Customer/Footer/Footer";

const MainHome = styled.div`
  background-color: var(--customer-background);
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none;
  /* background-color: var(--customer-background); */
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 75px;
`;

const Home = () => {
  return (
    <MainHome>
      <HomeContainer>
        <TopBar />

        <SliderContainer>
          <Slider></Slider>
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
