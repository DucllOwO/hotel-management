import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import vi from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

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
