import styled from "styled-components";
import Room from "./Room";

const RoomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 60px;
  grid-auto-rows: 390px;
  justify-content: flex-start;
  margin-left: 50px;

  @media only screen and (max-device-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    margin-left: 0;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1248px) {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 0;
  }
  @media only screen and (min-device-width: 1249px) and (max-device-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RoomContainer = styled.div`
  display: flex;
  justify-content: start;

  @media only screen and (max-device-width: 480px) {
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1248px) {
  }
  @media only screen and (min-device-width: 1249px) and (max-device-width: 1300px) {
    justify-content: center;
  }
`;

const RoomList = ({ roomData }) => {
  return (
    <RoomContainer>
      <RoomWrapper>
        {roomData.map((ele) => {
          return <Room {...ele} />;
        })}
      </RoomWrapper>
    </RoomContainer>
  );
};

export default RoomList;
