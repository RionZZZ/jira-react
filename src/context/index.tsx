import React from "react";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./auth-context";
import { QueryClientProvider, QueryClient } from "react-query";
// import { StyleProvider } from "@ant-design/cssinjs";

export const AppProvides = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
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
    </QueryClientProvider>
  );
};
