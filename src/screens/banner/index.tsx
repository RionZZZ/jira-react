import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useBanners } from "utils/banner";
import { BannerColumn } from "./banner-column";
import { SearchPanel } from "./search-panel";
import { useBannerSearchParams, useProjectFromUrl } from "./util";

export const BannerScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectFromUrl();
  const { data: banners } = useBanners(useBannerSearchParams());

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {banners?.map((banner) => (
          <BannerColumn banner={banner} key={banner.id} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
`;
