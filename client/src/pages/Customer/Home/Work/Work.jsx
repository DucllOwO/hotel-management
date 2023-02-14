import React from "react";
import styled from "styled-components";
import WorkCard from "../../../../components/Customer/WorkCard/WorkCard";

const WorkContainer = styled.div`
  padding: 0 60px;
  margin-top: 100px;
  margin-bottom: 20px;
  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-40);
  font-weight: var(--fw-bold);
  @media (max-width: 370px) {
    flex-direction: column;
    text-align: center;
  }
`;

const How = styled.div`
  color: var(--black);
`;

const Works = styled.span`
  margin-left: 2px;
  padding: 0 5px;
  background-color: var(--black);
  color: var(--primary-color);
  margin-bottom: 50px;
`;

const WorkDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
`;

const Work = () => {
  return (
    <WorkContainer>
      <TitleContainer>
        <How>HOW IT</How>
        <Works>WORKS</Works>
      </TitleContainer>
      <WorkDetails>
        <WorkCard
          title="BOOKING"
          content="Booking your own rooms online and capture your screen"
        />
        <WorkCard
          title="CHECK IN"
          content="Check-in in reception and receive your rooms"
          reverse={true}
        />
        <WorkCard
          title="ENJOY"
          content="Enjoy your journey and have experience with perfect services"
        />
        <WorkCard
          title="GOING BACK"
          content="Going back with many vouchers"
          reverse={true}
        />
      </WorkDetails>
    </WorkContainer>
  );
};

export default Work;