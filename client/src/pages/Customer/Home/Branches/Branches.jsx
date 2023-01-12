import React from "react";
import styled from "styled-components";
import BranchCard from "../../../../components/Customer/BranchCard/BranchCard";

const BranchesContainer = styled.div`
  padding: 0 60px;
  margin-top: 100px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-50);
  font-weight: var(--fw-bold);
  color: var(--black);
  margin-bottom: 50px;
`;

const BranchDetails = styled.div`
  display: flex;
  justify-content: space-between;
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
