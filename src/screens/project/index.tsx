import styled from "@emotion/styled";
import { Menu, MenuProps } from "antd";
import { Route, Routes, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { BannerScreen } from "screens/banner";
import { EpicScreen } from "screens/epic";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units.at(-1);
};

export const ProjectScreen = () => {
  const menuItems: MenuProps["items"] = [
    {
      key: "banner",
      label: <Link to="banner">看板</Link>,
    },
    {
      key: "epic",
      label: <Link to="epic">任务组</Link>,
    },
  ];
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType!]} items={menuItems} />
      </Aside>
      <Main>
        <Routes>
          <Route path="/banner" element={<BannerScreen />} />
          <Route path="/epic" element={<EpicScreen />} />
          <Route
            path="*"
            element={
              <Navigate to={window.location.pathname + "/banner"} replace />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
const Aside = styled.aside`
  display: flex;
  background-color: #efefef;
`;
const Main = styled.main`
  display: flex;
  box-shadow: -5px 0 -5px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;
