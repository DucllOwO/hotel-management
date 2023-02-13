import styled from "styled-components";
import SelectedButton from "../../../components/Customer/Button/SelectedButton";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, ConfigProvider, DatePicker, Empty, Select, Slider } from "antd";
import TopBar from "../../../components/Customer/TopBar/TopBar";
import Footer from "../../../components/Customer/Footer/Footer";
import RoomList from "../../../components/Customer/Booking/RoomList";
import { useState } from "react";
import FloatingButton from "../../../components/Customer/Button/FloatingButton";

const BookingContainer = styled.div`
  width: 100%;
  height: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ButtonContainer = styled.div`
  margin: 0 0 0 60px;
  flex: 3;
  @media (min-width: 300px) {
    margin: 0 0 0 30px;
  }
`;
const FilterContainer = styled.div`
  flex: 7;
  border: 2px solid var(--grey);
  border-radius: 20px;
  padding: 20px 20px 0 20px;
  margin: 0 40px 40px 0;
  @media (max-width: 480px) {
    margin: 0px;
    padding: 5px 0px 0 10px;
    width: 100%;
  }
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
  @media (max-width: 435px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: black;
  width: 40px;
  color: white;
  padding: 5px;
  border-radius: 14px;
  margin: 0 30px 0 20px;
  @media (max-width: 435px) {
    margin: 0;
  }
`;

const OtherInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 15px 0;
  flex-wrap: wrap;
  @media only screen and (max-device-width: 480px) {
    flex-direction: column;
  }
`;

const FilterInputWrapper = styled.div`
  margin: 0 20px 0 0;
  flex: 1;
`;

const BodyContainer = styled.div`
  background-color: var(--light-grey);
  height: fit-content;
  padding: 50px 40px;
  @media only screen and (max-device-width: 480px) {
    padding: 20px auto;
  }

  @media only screen and (max-device-width: 320px) {
    padding: 0;
  }
`;

const BranchInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;

const Star = styled.span`
  background-color: black;
  color: white;
  border-radius: 30px;
  height: 30px;
  width: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0;
`;

const RoomTypeHeader = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin: 80px 0 50px 50px;
`;

const SliderCustom = styled(Slider)`
  width: 100%;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    width: 300px;
  }
`;

const { RangePicker } = DatePicker;

const RangePickerCustom = styled(RangePicker)`
  background-color: var(--light-grey);
  height: 40px;
  margin: 15px 0 15px 0;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    width: 300px;
  }
`;

const Booking = () => {
  const [branch, setBranch] = useState(null);

  return (
    <BookingContainer>
      <TopBar />
      <HeaderContainer>
        <ButtonContainer>
          <ButtonConHeader>Room Type</ButtonConHeader>
          <ButtonWrapper>
            <SelectedButton
              text="Villa"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="Modern"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="High"
              style={{ margin: "10px 20px 10px 0" }}
            />
            <SelectedButton
              text="President"
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
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 24,
                    fontSize: 18,
                    colorBgContainer: "#F8F8F8",
                    colorPrimary: "#000000",
                    colorBorder: "#fff",
                    colorPrimaryBorderHover: "#ffffff",
                    colorPrimaryHover: "#ffffff",
                    colorPrimaryBgHover: "#ffffff",
                    colorPrimaryBorder: "#ffffff",
                    colorPrimaryBg: "#ffffff",
                    controlHeight: 40,
                  },
                }}
              >
                <Select
                  placeholder="Select province"
                  options={optionSelect}
                  onChange={(value) => setBranch(value)}
                  style={{
                    width: "100%",
                    margin: "15px 0 15px 0",
                    height: 40,
                  }}
                />
              </ConfigProvider>
            </FilterInputWrapper>
            <FilterInputWrapper>
              <div>
                <b>Date *</b>
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 24,
                    fontSize: 16,
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
                <RangePickerCustom format={"DD-MM-YYYY"} />
              </ConfigProvider>
            </FilterInputWrapper>
            <FilterInputWrapper>
              <div>
                <b>Price *</b>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <ConfigProvider
                  theme={{
                    token: {
                      borderRadius: 24,
                      fontSize: 18,
                      colorPrimary: "#000000",
                    },
                  }}
                >
                  <SliderCustom
                    range
                    step={100000}
                    min={0}
                    max={10000000}
                    tipFormatter={(value) => {
                      return `${value < 0 ? "-" : ""} ${Math.abs(value)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
                    }}
                  />
                </ConfigProvider>
              </div>
            </FilterInputWrapper>
          </OtherInputContainer>
        </FilterContainer>
      </HeaderContainer>
      <BodyContainer>{renderBody(branchInfoData, branch)}</BodyContainer>
      <FloatingButton />
      <Footer />
    </BookingContainer>
  );
};

const renderBody = (branchInfoData, branch) => {
  const branchTemp = branchInfoData.find((ele) => ele.branch === branch);

  if (!branchTemp || !branchTemp?.roomTypes)
    return (
      <>
        <BranchInfoContainer>
          <Star>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2008 5.99803C12.2699 3.33268 12.8045 2 13.7237 2C14.643 2 15.1776 3.33268 16.2467 5.99803L16.2965 6.12215C16.9005 7.62794 17.2025 8.38084 17.818 8.83846C18.4335 9.29608 19.2415 9.36844 20.8574 9.51316L21.1496 9.53932C23.7943 9.77618 25.1166 9.89461 25.3996 10.7359C25.6825 11.5772 24.7005 12.4707 22.7364 14.2576L22.0809 14.854C21.0867 15.7585 20.5895 16.2108 20.3578 16.8036C20.3146 16.9141 20.2787 17.0274 20.2503 17.1427C20.098 17.7607 20.2436 18.4168 20.5347 19.729L20.6253 20.1375C21.1604 22.5491 21.4279 23.755 20.9608 24.2751C20.7863 24.4694 20.5594 24.6094 20.3074 24.6781C19.633 24.8622 18.6754 24.0819 16.7604 22.5215C15.5029 21.4968 14.8742 20.9845 14.1523 20.8692C13.8684 20.8239 13.5791 20.8239 13.2951 20.8692C12.5733 20.9845 11.9445 21.4968 10.687 22.5215C8.77202 24.0819 7.81451 24.8622 7.14008 24.6781C6.88806 24.6094 6.6612 24.4694 6.48665 24.2751C6.01953 23.755 6.28707 22.5491 6.82214 20.1375L6.91277 19.729C7.20392 18.4168 7.34949 17.7607 7.19719 17.1427C7.16878 17.0274 7.13285 16.9141 7.08962 16.8036C6.85792 16.2108 6.36079 15.7585 5.36654 14.854L4.71103 14.2576C2.74696 12.4707 1.76492 11.5772 2.04787 10.7359C2.33082 9.89461 3.65318 9.77618 6.2979 9.53932L6.59003 9.51316C8.20599 9.36844 9.01396 9.29608 9.62947 8.83846C10.245 8.38084 10.547 7.62794 11.151 6.12214L11.2008 5.99803Z"
                stroke="white"
                stroke-width="2.71836"
              />
            </svg>
            <b
              style={{
                fontSize: 18,
                marginLeft: 5,
              }}
            >
              4
            </b>
          </Star>
          <span
            style={{
              fontSize: 18,
              marginLeft: 15,
            }}
          >
            <b>Parallel Shine</b>
          </span>
        </BranchInfoContainer>
        <Empty />
      </>
    );

  return (
    <>
      <BranchInfoContainer>
        <Star>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2008 5.99803C12.2699 3.33268 12.8045 2 13.7237 2C14.643 2 15.1776 3.33268 16.2467 5.99803L16.2965 6.12215C16.9005 7.62794 17.2025 8.38084 17.818 8.83846C18.4335 9.29608 19.2415 9.36844 20.8574 9.51316L21.1496 9.53932C23.7943 9.77618 25.1166 9.89461 25.3996 10.7359C25.6825 11.5772 24.7005 12.4707 22.7364 14.2576L22.0809 14.854C21.0867 15.7585 20.5895 16.2108 20.3578 16.8036C20.3146 16.9141 20.2787 17.0274 20.2503 17.1427C20.098 17.7607 20.2436 18.4168 20.5347 19.729L20.6253 20.1375C21.1604 22.5491 21.4279 23.755 20.9608 24.2751C20.7863 24.4694 20.5594 24.6094 20.3074 24.6781C19.633 24.8622 18.6754 24.0819 16.7604 22.5215C15.5029 21.4968 14.8742 20.9845 14.1523 20.8692C13.8684 20.8239 13.5791 20.8239 13.2951 20.8692C12.5733 20.9845 11.9445 21.4968 10.687 22.5215C8.77202 24.0819 7.81451 24.8622 7.14008 24.6781C6.88806 24.6094 6.6612 24.4694 6.48665 24.2751C6.01953 23.755 6.28707 22.5491 6.82214 20.1375L6.91277 19.729C7.20392 18.4168 7.34949 17.7607 7.19719 17.1427C7.16878 17.0274 7.13285 16.9141 7.08962 16.8036C6.85792 16.2108 6.36079 15.7585 5.36654 14.854L4.71103 14.2576C2.74696 12.4707 1.76492 11.5772 2.04787 10.7359C2.33082 9.89461 3.65318 9.77618 6.2979 9.53932L6.59003 9.51316C8.20599 9.36844 9.01396 9.29608 9.62947 8.83846C10.245 8.38084 10.547 7.62794 11.151 6.12214L11.2008 5.99803Z"
              stroke="white"
              stroke-width="2.71836"
            />
          </svg>
          <b
            style={{
              fontSize: 18,
              marginLeft: 5,
            }}
          >
            4
          </b>
        </Star>
        <span
          style={{
            fontSize: 18,
            marginLeft: 15,
          }}
        >
          <b>Parallel Shine - {branchTemp.branch}</b>
        </span>
      </BranchInfoContainer>
      {branchTemp.roomTypes.map((ele) => {
        return (
          <>
            <RoomTypeHeader>{ele.name}</RoomTypeHeader>
            <RoomList roomData={ele.rooms} />
          </>
        );
      })}
    </>
  );
};

const branchInfoData = [
  {
    id: 1,
    branch: "Nha Trang",
    roomTypes: [
      {
        id: 1,
        name: "Vila",
        rooms: [
          {
            id: 1,
            name: "V001",
            max_customers: 16,
            bed: 8,
            price: 100000000,
          },
          {
            id: 2,
            name: "V002",
            max_customers: 14,
            bed: 7,
            price: 100000000,
          },
          {
            id: 3,
            name: "V003",
            max_customers: 20,
            bed: 10,
            price: 100000000,
          },
        ],
      },
      {
        id: 2,
        name: "Modern",
        rooms: [
          {
            id: 4,
            name: "M001",
            max_customers: 3,
            bed: 6,
            price: 100000000,
          },
          {
            id: 5,
            name: "M002",
            max_customers: 2,
            bed: 1,
            price: 100000000,
          },
          {
            id: 6,
            name: "M003",
            max_customers: 4,
            bed: 2,
            price: 100000000,
          },
        ],
      },
      {
        id: 3,
        name: "President",
        rooms: [
          {
            id: 7,
            name: "P001",
            max_customers: 2,
            bed: 1,
            price: 100000000,
          },
          {
            id: 8,
            name: "P002",
            max_customers: 4,
            bed: 2,
            price: 100000000,
          },
          {
            id: 9,
            name: "P003",
            max_customers: 2,
            bed: 1,
            price: 100000000,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    branch: "TP Hồ Chí Minh",
    roomTypes: [
      {
        id: 1,
        name: "Vila",
        rooms: [
          {
            id: 1,
            name: "V001",
            max_customers: 16,
            bed: 8,
            price: 100000000,
          },
          {
            id: 2,
            name: "V002",
            max_customers: 14,
            bed: 7,
            price: 100000000,
          },
          {
            id: 3,
            name: "V003",
            max_customers: 20,
            bed: 10,
            price: 100000000,
          },
        ],
      },
      {
        id: 2,
        name: "Modern",
        rooms: [
          {
            id: 4,
            name: "M001",
            max_customers: 3,
            bed: 6,
            price: 100000000,
          },
          {
            id: 5,
            name: "M002",
            max_customers: 2,
            bed: 1,
            price: 100000000,
          },
          {
            id: 6,
            name: "M003",
            max_customers: 4,
            bed: 2,
            price: 100000000,
          },
        ],
      },
      {
        id: 3,
        name: "High",
        rooms: [
          {
            id: 7,
            name: "H001",
            max_customers: 2,
            bed: 1,
            price: 100000000,
          },
          {
            id: 8,
            name: "H002",
            max_customers: 4,
            bed: 2,
            price: 100000000,
          },
          {
            id: 9,
            name: "H003",
            max_customers: 2,
            bed: 1,
            price: 100000000,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    branch: "Đà Lạt",
    roomTypes: [
      {
        id: 1,
        name: "Vila",
        rooms: [
          {
            id: 1,
            name: "V001",
            max_customers: 16,
            bed: 8,
            price: 100000000,
          },
          {
            id: 2,
            name: "V002",
            max_customers: 14,
            bed: 7,
            price: 100000000,
          },
          {
            id: 3,
            name: "V003",
            max_customers: 20,
            bed: 10,
            price: 100000000,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    branch: "Vũng Tàu",
    roomTypes: null,
  },
];

const optionSelect = [
  { value: "Nha Trang", label: "Nha Trang" },
  { value: "TP Hồ Chí Minh", label: "TP Hồ Chí Minh" },
  { value: "Vũng Tàu", label: "Vũng Tàu" },
  { value: "Đà Lạt", label: "Đà Lạt" },
];

export default Booking;
