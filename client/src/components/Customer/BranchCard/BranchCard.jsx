import React from "react";
import styled from "styled-components";

const BranchCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
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

const BranchCard = () => {
  return (
    <BranchCardContainer>
      <BranchImage src="https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2017/07/avani-quy-nhon-resort-spa.jpg?fit=970%2C546&ssl=1"></BranchImage>
      <BranchName>Nha Trang RS</BranchName>
      <BranchAddress>136 Trần Phú, Nha Trang, Việt Nam</BranchAddress>
    </BranchCardContainer>
  );
};

export default BranchCard;
