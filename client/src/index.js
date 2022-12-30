import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import vi from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import isBetween from "dayjs/plugin/isBetween";

dayjs.locale("vi");
dayjs.extend(isBetween);

ReactDOM.render(
  <AppProvider>
    <ConfigProvider
      locale={vi}
      theme={{
        token: {},
      }}
    >
      <App />
    </ConfigProvider>
  </AppProvider>,
  document.getElementById("root")
);
