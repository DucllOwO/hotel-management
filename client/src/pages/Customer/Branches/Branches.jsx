import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import TopBar from "../../../components/Customer/TopBar/TopBar";
import Footer from "../../../components/Customer/Footer/Footer";

const BranchInfoLi = styled.li`
  width: 100%;
  margin: 15px 0;
`;

const BranchContent = styled.a`
  width: 100%;
  cursor: pointer;
  font-weight: 400;
  &:link {
    color: white;
    text-decoration: none;
  }

  &:visited {
    font-weight: 700;
  }

  &:link:active,
  &:visited:active {
    font-weight: 700;
  }

  &[tabindex]:focus {
    font-weight: 700;
  }
`;

const BranchContainer = styled.div`
  width: 400px;
  height: 600px;
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;

  @media only screen and (max-device-width: 480px) {
    margin-left: 0px;
    width: 80vw;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
  }
`;

const BranchHeader = styled.h1`
  font-size: 40px;
  margin: 25px 0 0 0;
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
  font-size: 18px;
  padding-left: 25px;
  flex: 9;
  margin-left: 10px;
  width: 90%;

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
  margin: 0 15px 0 20px;
`;

const BranchBody = styled.ul`
  list-style-type: none;
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

const BranchesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  @media only screen and (max-device-width: 1248px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 50px;
    justify-content: center;
    align-items: center;
  }
`;

const Iframe = styled.iframe`
  width: 600px;
  height: 450px;

  @media only screen and (max-device-width: 480px) {
    width: auto;
    height: 400px;
    margin-bottom: 20px;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1248px) {
    margin-bottom: 20px;
  }
`;

const Branches = () => {
  return (
    <div>
      <TopBar />
      <BranchesContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <BranchContainer>
            <BranchHeader>Branches</BranchHeader>
            <hr
              style={{
                backgroundColor: "rgba(192, 192, 192, 1)",
                height: 5,
                width: "80%",
                border: "none",
                marginBottom: 25,
              }}
            />
            <SearchWrapper>
              <SearchInput type="text" placeholder="Tìm kiếm" />
              <SearchButton>
                <SearchOutlined style={{ fontSize: "28px" }} />
              </SearchButton>
            </SearchWrapper>
            <BranchBody>
              <BranchInfoLi>
                <BranchContent tabIndex={1}>
                  <Grid>
                    <span style={{ fontSize: 18 }}>Nha Trang</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ paddingTop: 3, marginRight: 5 }}>4.0</span>
                      <svg
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8403 4.71045C12.0999 1.57015 12.7298 0 13.8128 0C14.8959 0 15.5257 1.57015 16.7853 4.71045L16.844 4.85668C17.5556 6.63079 17.9114 7.51785 18.6366 8.05701C19.3618 8.59618 20.3138 8.68143 22.2177 8.85194L22.5619 8.88277C25.6778 9.16183 27.2358 9.30136 27.5692 10.2926C27.9026 11.2838 26.7456 12.3365 24.4315 14.4418L23.6592 15.1444C22.4878 16.2102 21.9021 16.743 21.6291 17.4414C21.5781 17.5717 21.5358 17.7052 21.5023 17.841C21.3229 18.5691 21.4944 19.3421 21.8374 20.8882L21.9442 21.3695C22.5746 24.2108 22.8898 25.6315 22.3395 26.2443C22.1338 26.4733 21.8665 26.6382 21.5696 26.7192C20.775 26.936 19.6469 26.0167 17.3906 24.1782C15.9091 22.971 15.1683 22.3673 14.3178 22.2315C13.9833 22.1781 13.6424 22.1781 13.3078 22.2315C12.4573 22.3673 11.7165 22.971 10.235 24.1782C7.97874 26.0167 6.85061 26.936 6.056 26.7192C5.75908 26.6382 5.49179 26.4733 5.28614 26.2443C4.73578 25.6315 5.05099 24.2108 5.68141 21.3695L5.78818 20.8882C6.13121 19.3421 6.30273 18.5691 6.12328 17.841C6.08981 17.7052 6.04748 17.5717 5.99655 17.4414C5.72356 16.743 5.13785 16.2102 3.96643 15.1444L3.19412 14.4418C0.880059 12.3365 -0.276971 11.2838 0.0564017 10.2926C0.389774 9.30136 1.94776 9.16183 5.06374 8.88277L5.40794 8.85194C7.31184 8.68143 8.26379 8.59618 8.98898 8.05701C9.71416 7.51785 10.07 6.63079 10.7816 4.85668L10.8403 4.71045Z"
                          fill="#FFDC82"
                        />
                      </svg>
                    </div>
                  </Grid>
                </BranchContent>
              </BranchInfoLi>
              <BranchInfoLi>
                <BranchContent tabIndex={2}>
                  <Grid>
                    <span style={{ fontSize: 18 }}>Tp Hồ Chí Minh</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ paddingTop: 3, marginRight: 5 }}>4.7</span>
                      <svg
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8403 4.71045C12.0999 1.57015 12.7298 0 13.8128 0C14.8959 0 15.5257 1.57015 16.7853 4.71045L16.844 4.85668C17.5556 6.63079 17.9114 7.51785 18.6366 8.05701C19.3618 8.59618 20.3138 8.68143 22.2177 8.85194L22.5619 8.88277C25.6778 9.16183 27.2358 9.30136 27.5692 10.2926C27.9026 11.2838 26.7456 12.3365 24.4315 14.4418L23.6592 15.1444C22.4878 16.2102 21.9021 16.743 21.6291 17.4414C21.5781 17.5717 21.5358 17.7052 21.5023 17.841C21.3229 18.5691 21.4944 19.3421 21.8374 20.8882L21.9442 21.3695C22.5746 24.2108 22.8898 25.6315 22.3395 26.2443C22.1338 26.4733 21.8665 26.6382 21.5696 26.7192C20.775 26.936 19.6469 26.0167 17.3906 24.1782C15.9091 22.971 15.1683 22.3673 14.3178 22.2315C13.9833 22.1781 13.6424 22.1781 13.3078 22.2315C12.4573 22.3673 11.7165 22.971 10.235 24.1782C7.97874 26.0167 6.85061 26.936 6.056 26.7192C5.75908 26.6382 5.49179 26.4733 5.28614 26.2443C4.73578 25.6315 5.05099 24.2108 5.68141 21.3695L5.78818 20.8882C6.13121 19.3421 6.30273 18.5691 6.12328 17.841C6.08981 17.7052 6.04748 17.5717 5.99655 17.4414C5.72356 16.743 5.13785 16.2102 3.96643 15.1444L3.19412 14.4418C0.880059 12.3365 -0.276971 11.2838 0.0564017 10.2926C0.389774 9.30136 1.94776 9.16183 5.06374 8.88277L5.40794 8.85194C7.31184 8.68143 8.26379 8.59618 8.98898 8.05701C9.71416 7.51785 10.07 6.63079 10.7816 4.85668L10.8403 4.71045Z"
                          fill="#FFDC82"
                        />
                      </svg>
                    </div>
                  </Grid>
                </BranchContent>
              </BranchInfoLi>
              <BranchInfoLi>
                <BranchContent tabIndex={3}>
                  <Grid>
                    <span style={{ fontSize: 18 }}>Vũng Tàu</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ paddingTop: 3, marginRight: 5 }}>4.5</span>
                      <svg
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8403 4.71045C12.0999 1.57015 12.7298 0 13.8128 0C14.8959 0 15.5257 1.57015 16.7853 4.71045L16.844 4.85668C17.5556 6.63079 17.9114 7.51785 18.6366 8.05701C19.3618 8.59618 20.3138 8.68143 22.2177 8.85194L22.5619 8.88277C25.6778 9.16183 27.2358 9.30136 27.5692 10.2926C27.9026 11.2838 26.7456 12.3365 24.4315 14.4418L23.6592 15.1444C22.4878 16.2102 21.9021 16.743 21.6291 17.4414C21.5781 17.5717 21.5358 17.7052 21.5023 17.841C21.3229 18.5691 21.4944 19.3421 21.8374 20.8882L21.9442 21.3695C22.5746 24.2108 22.8898 25.6315 22.3395 26.2443C22.1338 26.4733 21.8665 26.6382 21.5696 26.7192C20.775 26.936 19.6469 26.0167 17.3906 24.1782C15.9091 22.971 15.1683 22.3673 14.3178 22.2315C13.9833 22.1781 13.6424 22.1781 13.3078 22.2315C12.4573 22.3673 11.7165 22.971 10.235 24.1782C7.97874 26.0167 6.85061 26.936 6.056 26.7192C5.75908 26.6382 5.49179 26.4733 5.28614 26.2443C4.73578 25.6315 5.05099 24.2108 5.68141 21.3695L5.78818 20.8882C6.13121 19.3421 6.30273 18.5691 6.12328 17.841C6.08981 17.7052 6.04748 17.5717 5.99655 17.4414C5.72356 16.743 5.13785 16.2102 3.96643 15.1444L3.19412 14.4418C0.880059 12.3365 -0.276971 11.2838 0.0564017 10.2926C0.389774 9.30136 1.94776 9.16183 5.06374 8.88277L5.40794 8.85194C7.31184 8.68143 8.26379 8.59618 8.98898 8.05701C9.71416 7.51785 10.07 6.63079 10.7816 4.85668L10.8403 4.71045Z"
                          fill="#FFDC82"
                        />
                      </svg>
                    </div>
                  </Grid>
                </BranchContent>
              </BranchInfoLi>
              <BranchInfoLi>
                <BranchContent tabIndex={4}>
                  <Grid>
                    <span style={{ fontSize: 18 }}>Đà Lạt</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ paddingTop: 3, marginRight: 5 }}>4.8</span>
                      <svg
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8403 4.71045C12.0999 1.57015 12.7298 0 13.8128 0C14.8959 0 15.5257 1.57015 16.7853 4.71045L16.844 4.85668C17.5556 6.63079 17.9114 7.51785 18.6366 8.05701C19.3618 8.59618 20.3138 8.68143 22.2177 8.85194L22.5619 8.88277C25.6778 9.16183 27.2358 9.30136 27.5692 10.2926C27.9026 11.2838 26.7456 12.3365 24.4315 14.4418L23.6592 15.1444C22.4878 16.2102 21.9021 16.743 21.6291 17.4414C21.5781 17.5717 21.5358 17.7052 21.5023 17.841C21.3229 18.5691 21.4944 19.3421 21.8374 20.8882L21.9442 21.3695C22.5746 24.2108 22.8898 25.6315 22.3395 26.2443C22.1338 26.4733 21.8665 26.6382 21.5696 26.7192C20.775 26.936 19.6469 26.0167 17.3906 24.1782C15.9091 22.971 15.1683 22.3673 14.3178 22.2315C13.9833 22.1781 13.6424 22.1781 13.3078 22.2315C12.4573 22.3673 11.7165 22.971 10.235 24.1782C7.97874 26.0167 6.85061 26.936 6.056 26.7192C5.75908 26.6382 5.49179 26.4733 5.28614 26.2443C4.73578 25.6315 5.05099 24.2108 5.68141 21.3695L5.78818 20.8882C6.13121 19.3421 6.30273 18.5691 6.12328 17.841C6.08981 17.7052 6.04748 17.5717 5.99655 17.4414C5.72356 16.743 5.13785 16.2102 3.96643 15.1444L3.19412 14.4418C0.880059 12.3365 -0.276971 11.2838 0.0564017 10.2926C0.389774 9.30136 1.94776 9.16183 5.06374 8.88277L5.40794 8.85194C7.31184 8.68143 8.26379 8.59618 8.98898 8.05701C9.71416 7.51785 10.07 6.63079 10.7816 4.85668L10.8403 4.71045Z"
                          fill="#FFDC82"
                        />
                      </svg>
                    </div>
                  </Grid>
                </BranchContent>
              </BranchInfoLi>
            </BranchBody>
          </BranchContainer>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto 0",
          }}
        >
          <Iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2312403776427!2d106.80086541476484!3d10.87000889225807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1675692547284!5m2!1sen!2s"
            style={{ border: 0, borderRadius: 10 }}
            referrerPolicy="no-referrer-when-downgrade"
          ></Iframe>
        </div>
      </BranchesContainer>
      <Footer />
    </div>
  );
};

export default Branches;
