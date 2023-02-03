import React from "react";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./auth-context";
// import { StyleProvider } from "@ant-design/cssinjs";

export const AppProvides = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#a8dca0",
          fontSize: 16,
        },
      }}
    >
      {/* <StyleProvider hashPriority="high"> */}
      <AuthProvider>{children}</AuthProvider>
      {/* </StyleProvider> */}
    </ConfigProvider>
  );
};
