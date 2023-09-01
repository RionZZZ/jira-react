import { Card, Button, Divider, Typography } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import leftBg from "assets/left.svg";
import rightBg from "assets/right.svg";
import { useDocumentTitle } from "utils";
import { ErrorBox } from "components/lib";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
  padding: 8rem 0;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${leftBg}), url(${rightBg});
`;

const CardShadow = styled(Card)`
  width: 40rem;
  min-height: 30rem;
  padding: 3rem 4rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

export default function UnauthenticatedApp() {
  useDocumentTitle("登录注册");

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Background />
      <Header />
      <Button
        onClick={() => {
          throw new Error("throw error");
        }}
      >
        throw error
      </Button>
      <CardShadow>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {error ? (
          <ErrorBox error={error} />
        ) : // <Typography.Text type="danger">{error.message}</Typography.Text>
        null}
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <LongButton
          type="text"
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "直接登录" : "注册账号"}
        </LongButton>
      </CardShadow>
    </Container>
  );
}
