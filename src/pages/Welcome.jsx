import React, { useEffect } from "react";
import { Card, Typography, Alert } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { FormattedMessage } from "umi-plugin-react/locale";

const CodePreview = ({ children }) => (
  <pre
    style={{
      background: "#f2f4f5",
      padding: "12px 20px",
      margin: "12px 0"
    }}
  >
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
const ele = (
  <div
    style={{
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <h1 style={{ fontSize: "40px" }}>欢迎使用</h1>
    <h3 style={{ fontSize: "45px" }}>新人培训后台管理系统</h3>
  </div>
);

export default () => {
  // window.location.reload()
  return <PageHeaderWrapper content={ele} className="home" className="home" />;
};
