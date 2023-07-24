import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useBanners } from "utils/banner";
import { BannerColumn } from "./banner-column";
import { SearchPanel } from "./search-panel";
import {
  useBannerSearchParams,
  useEpicSearchParams,
  useProjectFromUrl,
} from "./util";
import { useEpics } from "utils/epic";
import { Spin } from "antd";
import { CreateBanner } from "./create-banner";

export const BannerScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectFromUrl();
  const { data: banners, isLoading: bannerLoading } = useBanners(
    useBannerSearchParams()
  );
  const { isLoading: epicLoading } = useEpics(useEpicSearchParams());
  const isLoading = bannerLoading || epicLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {banners?.map((banner) => (
            <BannerColumn banner={banner} key={banner.id} />
          ))}
          <CreateBanner />
        </ColumnContainer>
      )}
    </ScreenContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
`;
