import styled from "@emotion/styled";
import { Button, Dropdown, MenuProps } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { resetRoute } from "utils";
import { ProjectPopover } from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-modal";
import { useState } from "react";

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

export const AuthenticatedApp = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding type={"link"} onClick={() => setModalOpen(true)}>
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        {/* <ProjectListScreen /> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      type={"link"}
                      onClick={() => setModalOpen(true)}
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Container>
  );
};

const PageHeader = ({ projectButton }: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={logo} alt="logo" /> */}
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <Logo width={"18rem"} color={"#1B75F0"} />
        </ButtonNoPadding>
        <ProjectPopover projectButton={projectButton} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
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
    <Dropdown menu={{ items: menuItems }}>
      <Button type="link">Hi,{user?.name}</Button>
    </Dropdown>
  );
};
