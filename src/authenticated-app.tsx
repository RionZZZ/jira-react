import styled from "@emotion/styled";
import { Button, Dropdown, MenuProps } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
const Footer = styled.footer``;

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* <ProjectListScreen /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <Footer></Footer>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  const menuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button type="text" onClick={logout}>
          logout
        </Button>
      ),
    },
  ];

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={logo} alt="logo" /> */}
        <Logo width={"18rem"} color={"#1B75F0"} />
        <h3>logo</h3>
        <h3>logo</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items: menuItems }}>
          <Button type="link">Hi,{user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
