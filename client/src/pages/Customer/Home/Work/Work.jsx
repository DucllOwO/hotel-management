import React from "react";
import styled from "styled-components";
import WorkCard from "../../../../components/Customer/WorkCard/WorkCard";

const WorkContainer = styled.div`
  padding: 0 60px;
  margin-top: 100px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-40);
  font-weight: var(--fw-bold);
`;

const How = styled.div`
  color: var(--black);
`;

const Works = styled.div`
  margin-left: 2px;
  padding: 0 5px;
  background-color: var(--black);
  color: var(--primary-color);
  margin-bottom: 50px;
`;

const WorkDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Work = () => {
  return (
    <WorkContainer>
      <TitleContainer>
        <How>HOW IT</How>
        <Works>WORKS</Works>
      </TitleContainer>
      <WorkDetails>
        <WorkCard />
        <WorkCard reverse={true} />
        <WorkCard />
        <WorkCard reverse={true} />
      </WorkDetails>
    </WorkContainer>
  );
};

export default Work;
