import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { Image, Rate } from "antd";
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

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.8fr;
  height: 100%;
  margin-top: 20px;

  @media only screen and (max-device-width: 1248px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 50px;
    justify-content: center;
    align-items: center;
  }
`;

const CommentContainer = styled.div`
  height: 700px;
  width: 600px;
  overflow-y: scroll;
  overflow-x: hidden;

  @media only screen and (max-device-width: 1024px) {
    width: 100vw;
  }
`;

const Comment = styled.div`
  width: 90%;
  height: min-content;
  border-radius: 10px;
  background-color: var(--light-grey);
  padding: 20px 25px 20px 25px;
  margin-bottom: 30px;

  @media only screen and (max-device-width: 1024px) {
    width: 80%;
    margin-left: 5%;
    padding: 15px;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const CommentBody = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const WritePreviewBody = styled.div`
  width: 270px;
  height: 470px;
  background-color: var(--light-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SubmitButton = styled.div`
  color: var(--primary-color);
  background-color: var(--black);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Review = () => {
  return (
    <div>
      <TopBar />
      <ReviewContainer>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CommentContainer>
            <Comment>
              <CommentHeader>
                <span>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="26" cy="26" r="26" fill="black" />
                    <path
                      d="M24.7045 35H20.1619V31.8381H24.5511C25.642 31.8381 26.5597 31.6449 27.304 31.2585C28.054 30.8665 28.6165 30.2614 28.9915 29.4432C29.3722 28.6193 29.5625 27.5568 29.5625 26.2557C29.5625 24.9659 29.3722 23.9119 28.9915 23.0938C28.6165 22.2756 28.0568 21.6733 27.3125 21.2869C26.5682 20.9006 25.6506 20.7074 24.5597 20.7074H20.0852V17.5455H24.7557C26.5114 17.5455 28.0227 17.8949 29.2898 18.5938C30.5568 19.2869 31.5313 20.2841 32.2131 21.5852C32.9006 22.8864 33.2443 24.4432 33.2443 26.2557C33.2443 28.0739 32.9006 29.6364 32.2131 30.9432C31.5313 32.25 30.5511 33.2528 29.2727 33.9517C28 34.6506 26.4773 35 24.7045 35ZM22.2074 17.5455V35H18.517V17.5455H22.2074ZM16.0966 26.8693V24.7216H24.5938V26.8693H16.0966Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span style={{ margin: "0 0 5px 10px" }}>Nguyễn Trí Đức</span>
              </CommentHeader>
              <CommentBody>
                View biển trực diện, ngay quảng trường bãi sau Nhà sạch, đủ tiện
                nghi Nhân viên vui vẻ, nhiệt tình, có mặt ngay khi cần
              </CommentBody>
            </Comment>
            <Comment>
              <CommentHeader>
                <span>
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="26" cy="26" r="26" fill="black" />
                    <path
                      d="M21.6705 17.5455L25.8892 30.8068H26.0511L30.2784 17.5455H34.3693L28.3523 35H23.5966L17.571 17.5455H21.6705Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span style={{ margin: "0 0 5px 10px" }}>Thế Vĩ</span>
              </CommentHeader>
              <CommentBody>
                Nhân viên dẫn lên phòng thân thiện, quan tâm khách. Phòng ngay
                bãi biển rất thuận tiện đi lại, phòng sạch sẽ, đầy đủ. Nhất định
                làn sau tôi sẽ ghé lại. Cám ơn team
              </CommentBody>
            </Comment>
            <Comment>
              <CommentHeader>
                <span>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="26" cy="26" r="26" fill="black" />
                    <path
                      d="M24.7045 35H20.1619V31.8381H24.5511C25.642 31.8381 26.5597 31.6449 27.304 31.2585C28.054 30.8665 28.6165 30.2614 28.9915 29.4432C29.3722 28.6193 29.5625 27.5568 29.5625 26.2557C29.5625 24.9659 29.3722 23.9119 28.9915 23.0938C28.6165 22.2756 28.0568 21.6733 27.3125 21.2869C26.5682 20.9006 25.6506 20.7074 24.5597 20.7074H20.0852V17.5455H24.7557C26.5114 17.5455 28.0227 17.8949 29.2898 18.5938C30.5568 19.2869 31.5313 20.2841 32.2131 21.5852C32.9006 22.8864 33.2443 24.4432 33.2443 26.2557C33.2443 28.0739 32.9006 29.6364 32.2131 30.9432C31.5313 32.25 30.5511 33.2528 29.2727 33.9517C28 34.6506 26.4773 35 24.7045 35ZM22.2074 17.5455V35H18.517V17.5455H22.2074ZM16.0966 26.8693V24.7216H24.5938V26.8693H16.0966Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span style={{ margin: "0 0 5px 10px" }}>Tiến Thịnh</span>
              </CommentHeader>
              <CommentBody>
                Tuyệt vời, gia đình tôi rất thích + {"<3"}
              </CommentBody>
            </Comment>
            <Comment>
              <CommentHeader>
                <span>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="26" cy="26" r="26" fill="black" />
                    <path
                      d="M24.7045 35H20.1619V31.8381H24.5511C25.642 31.8381 26.5597 31.6449 27.304 31.2585C28.054 30.8665 28.6165 30.2614 28.9915 29.4432C29.3722 28.6193 29.5625 27.5568 29.5625 26.2557C29.5625 24.9659 29.3722 23.9119 28.9915 23.0938C28.6165 22.2756 28.0568 21.6733 27.3125 21.2869C26.5682 20.9006 25.6506 20.7074 24.5597 20.7074H20.0852V17.5455H24.7557C26.5114 17.5455 28.0227 17.8949 29.2898 18.5938C30.5568 19.2869 31.5313 20.2841 32.2131 21.5852C32.9006 22.8864 33.2443 24.4432 33.2443 26.2557C33.2443 28.0739 32.9006 29.6364 32.2131 30.9432C31.5313 32.25 30.5511 33.2528 29.2727 33.9517C28 34.6506 26.4773 35 24.7045 35ZM22.2074 17.5455V35H18.517V17.5455H22.2074ZM16.0966 26.8693V24.7216H24.5938V26.8693H16.0966Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span style={{ margin: "0 0 5px 10px" }}>Kim Điền</span>
              </CommentHeader>
              <CommentBody>
                Tiện nghi đầy đủ, kích thước phòng rộng rãi thoải mái. Nhân viên
                phục vụ nhiệt tình, thân thiện. Tiện ích xung quanh đầy đủ để
                phục vụ các nhu cầu cần thiết
              </CommentBody>
            </Comment>
          </CommentContainer>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <img
              src={require("../../../assets/images/reviewpic.png")}
              alt="share your experiment"
              width={270}
              height={245}
              style={{ margin: 0 }}
            />
            <WritePreviewBody>
              <Rate />
              {/* <input
              type={"text"}
              style={{
                width: "90%",
                height: "90%",
                margin: "5px",
                backgroundColor: "var(--grey)",
                textAlign: "start",
              }}
            /> */}
              <textarea
                style={{
                  width: "90%",
                  height: "90%",
                  margin: "5px",
                  backgroundColor: "var(--grey)",
                  resize: "none",
                  fontSize: 18,
                  fontWeight: 400,
                  border: "none",
                }}
              />
              <SubmitButton>Submit</SubmitButton>
            </WritePreviewBody>
          </div>
        </div>
      </ReviewContainer>
      <Footer />
    </div>
  );
};

export default Review;
