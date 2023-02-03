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

const BranchMap = styled.div`
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4174.555098008686!2d106.80488083578801!3d10.872399573704133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1671204863752!5m2!1sen!2s"
  id="map"
  style="border: 0"
  allowfullscreen=""
  style="margin: auto"
  referrerpolicy="no-referrer-when-downgrade"></iframe>
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
      <BranchMap></BranchMap>
    </BranchesContainer>
  );
};

export default Branches;
