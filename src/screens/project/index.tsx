import { Route, Routes, Navigate } from "react-router";
import { Link } from "react-router-dom";
import { BannerScreen } from "screens/banner";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h2>Project</h2>
      <Link to="banner">看板</Link>
      <Link to="epic">任务组</Link>
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
    </div>
  );
};
