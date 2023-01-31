import styled from "styled-components";
import React, { useState } from "react";

const SelectButton = styled.button`
  font-size: var(--fs-18);
  background-color: var(--black);
  color: var(--primary-color);
  border-radius: var(--br-30);
  padding: 10px 20px;
  font-family: "Inter";
  font-weight: var(--fw-medium);
`;

const UnSelectButton = styled.button`
  font-size: var(--fs-18);
  background-color: transparent;
  color: black;
  border-radius: var(--br-30);
  padding: 10px 20px;
  font-family: "Inter";
  font-weight: var(--fw-medium);
`;

const SelectedButton = ({ text, style }) => {
  const [clicked, setClicked] = useState(true);
  return clicked ? (
    <UnSelectButton onClick={(e) => setClicked((prev) => !prev)} style={style}>
      {text}
    </UnSelectButton>
  ) : (
    <SelectButton onClick={(e) => setClicked((prev) => !prev)} style={style}>
      {text}
    </SelectButton>
  );
};

export default SelectedButton;
