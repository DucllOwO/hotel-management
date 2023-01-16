import React from "react";
import styled from "styled-components";
import SelectedButton from "../../../components/Customer/Button/SelectedButton";
import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker, Slider } from "antd";

const BookingContainer = styled.div`
  width: 98vw;
  height: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ButtonContainer = styled.div`
  margin: 0 0 0 60px;
  flex: 2;
`;
const FilterContainer = styled.div`
  flex: 8;
  border: 2px solid var(--grey);
  border-radius: 20px;
  padding: 20px 20px 0 20px;
  margin: 0 20px 40px 0;
`;

const ButtonConHeader = styled.p`
  font-size: var(--fs-18);
  font-weight: var(--fw-bold);
`;

const HeaderWrapper = styled.div`
  font-size: var(--fs-18);
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--grey);
  width: 100%;
  margin: 10px 0px 20px 0;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 0 0;
`;

const Input = styled.input`
  border: none;
  background-color: var(--light-grey);
  border-radius: 30px;
  height: 40px;
  width: 270px;
  font-size: var(--fs-18);
  padding: 0 10px;
  margin: 15px 0 0 0;

  :focus {
    outline: none;
  }
`;
const SearchInput = styled.input`
  border: none;
  background-color: var(--light-grey);
  border-radius: 30px;
  height: 40px;
  font-size: var(--fs-18);
  padding-left: 25px;
  flex: 9;

  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: black;
  width: 41px;
  color: white;
  padding: 5px;
  border-radius: 14px;
  margin: 0 30px 0 20px;
`;

const OtherInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 15px 0;
  flex-wrap: wrap;
`;

const FilterInputWrapper = styled.div`
  margin: 0 20px 0 0;
  flex: 1;
`;

const BodyContainer = styled.div`
  background-color: var(--light-grey);
`;

const { RangePicker } = DatePicker;

const Booking = () => {
  return (
    <BookingContainer>
      <HeaderContainer>
        <ButtonContainer>
          <ButtonConHeader>Room Type</ButtonConHeader>
          <ButtonWrapper>
            <SelectedButton
              text="luxyry"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="luxyry"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="luxyry"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="luxyry"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="luxyry"
              style={{ margin: "10px 20px 10px 0" }}
            />
          </ButtonWrapper>
        </ButtonContainer>
        <FilterContainer>
          <HeaderWrapper>
            <b>Bộ lọc</b> ({"9"})
          </HeaderWrapper>
          <Divider />
          <SearchWrapper>
            <SearchInput type="text" placeholder="Tìm kiếm" />
            <SearchButton>
              <SearchOutlined style={{ fontSize: "28px" }} />
            </SearchButton>
          </SearchWrapper>

          <OtherInputContainer>
            <FilterInputWrapper>
              <div>
                <b>Branch *</b>
              </div>
              <Input placeholder="Sai Gon" />
            </FilterInputWrapper>
            <FilterInputWrapper>
              <div>
                <b>Date *</b>
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 24,
                    fontSize: 18,
                    colorPrimary: "#000000",
                    colorBorder: "#fff",
                    colorPrimaryBorderHover: "#ffffff",
                    colorPrimaryHover: "#ffffff",
                    colorPrimaryBgHover: "#ffffff",
                    colorPrimaryBorder: "#ffffff",
                    colorPrimaryBg: "#ffffff",
                  },
                }}
              >
                <RangePicker
                  format={"DD-MM-YYYY"}
                  style={{
                    backgroundColor: "var(--light-grey)",
                    height: 40,
                    margin: "15px 0 15px 0",
                    width: "80%",
                  }}
                />
              </ConfigProvider>
            </FilterInputWrapper>
            <FilterInputWrapper>
              <div>
                <b>Price *</b>
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 24,
                    fontSize: 18,
                    colorPrimary: "#000000",
                  },
                }}
              >
                <Slider
                  range
                  style={{ width: "20vw" }}
                  step={100000}
                  min={0}
                  max={10000000}
                  tipFormatter={(value) => {
                    return `${value < 0 ? "-" : ""} ${Math.abs(value)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                  }}
                />
              </ConfigProvider>
            </FilterInputWrapper>
          </OtherInputContainer>
        </FilterContainer>
      </HeaderContainer>
      <BodyContainer></BodyContainer>
    </BookingContainer>
  );
};

export default Booking;
