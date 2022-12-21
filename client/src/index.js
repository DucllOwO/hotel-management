import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <AppProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </AppProvider>,
  document.getElementById("root")
);
