import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";

ReactDOM.render(
  <AppProvider>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#A0D911",
          colorPrimaryBg: "#455a19",
          fontSize: 16,
          colorBgBase: "#2b342b",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </AppProvider>,
  document.getElementById("root")
);
