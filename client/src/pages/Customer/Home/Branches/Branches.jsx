import React from "react";
import styled from "styled-components";
import BranchCard from "../../../../components/Customer/BranchCard/BranchCard";

const BranchesContainer = styled.div`
  padding: 0 60px;
  margin-top: 100px;
  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-40);
  font-weight: var(--fw-bold);
  color: var(--black);
  margin-bottom: 50px;
`;

const BranchDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
`;

const Branches = () => {
  return (
    <BranchesContainer>
      <Title>BRANCHES</Title>
      <BranchDetails>
        <BranchCard></BranchCard>
        <BranchCard></BranchCard>
        <BranchCard></BranchCard>
        <BranchCard></BranchCard>
      </BranchDetails>
    </BranchesContainer>
  );
};

export default Branches;
