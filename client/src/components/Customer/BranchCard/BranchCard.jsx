import React from "react";
import styled from "styled-components";

const BranchCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
  @media (max-width: 768px) {
    width: 48%;
    margin-bottom: 10px;
  }
  @media (max-width: 420px) {
    width: 100%;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
    margin-bottom: 10px;
  }
`;

const BranchImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const BranchName = styled.div`
  font-size: var(--fs-18);
  font-weight: var(--fw-bold);
  color: var(--black);
  margin-top: 10px;
`;

const BranchAddress = styled.div`
  font-size: var(--fs-14);
  font-weight: var(--fw-normal);
  color: var(--black);
  margin-top: 10px;
`;

const BranchCard = (props) => {
  return (
    <BranchCardContainer>
      <BranchImage src={props.img}></BranchImage>
      <BranchName>{props.name}</BranchName>
      <BranchAddress>{props.address}</BranchAddress>
    </BranchCardContainer>
  );
};

export default BranchCard;
