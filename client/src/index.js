import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";

ReactDOM.render(
  <AppProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </AppProvider>,
  document.getElementById("root")
);
