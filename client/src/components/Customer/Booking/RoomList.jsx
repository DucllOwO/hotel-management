import styled from "styled-components";
import Room from "./Room";

const RoomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 60px;
  grid-auto-rows: 390px;
  justify-content: flex-start;

  @media only screen and (max-device-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RoomList = ({ roomData }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <RoomWrapper>
        {roomData.map((ele) => {
          return <Room {...ele} />;
        })}
      </RoomWrapper>
    </div>
  );
};

export default RoomList;
