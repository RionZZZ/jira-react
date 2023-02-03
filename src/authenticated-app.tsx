import styled from "@emotion/styled";
import { Button } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
const Footer = styled.footer``;

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Row between={true}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>logo</h3>
          <h3>logo</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout} type="primary">
            logout
          </Button>
        </HeaderRight>
      </Row>
      <Main>
        <ProjectListScreen />
      </Main>
      <Footer></Footer>
    </Container>
  );
};
