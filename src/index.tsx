import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { loadDevTools } from "jira-dev-tool"; 旧版本会报错，使用下面@next
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProvides } from "context";
// 在jira-dev-tool后面引入antd
/* 
  jira-dev-tool内部引用了antd的less文件（旧版本）
  而新版本5.x中，使用css-in-js来修改主题色，不再使用less
  从而造成冲突，设置primaryColor没作用
 */
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvides>
      <DevTools />
      <App />
    </AppProvides>
  </React.StrictMode>
);
loadServer(() => root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
