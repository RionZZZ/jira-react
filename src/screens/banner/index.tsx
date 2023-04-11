import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useBanners } from "utils/banner";
import { BannerColumn } from "./banner-column";
import { useBannerSearchParams, useProjectFromUrl } from "./util";

export const BannerScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectFromUrl();
  const { data: banners } = useBanners(useBannerSearchParams());

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnContainer>
        {banners?.map((banner) => (
          <BannerColumn banner={banner} key={banner.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
