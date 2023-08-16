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
import { EpicModal } from "./epic-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

export const BannerScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectFromUrl();
  const { data: banners, isLoading: bannerLoading } = useBanners(
    useBannerSearchParams()
  );
  const { isLoading: epicLoading } = useEpics(useEpicSearchParams());
  const isLoading = bannerLoading || epicLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnContainer>
            <Drop type={"COLUMN"} direction="horizontal" droppableId="banner">
              <DropChild style={{ display: "flex" }}>
                {banners?.map((banner, index) => (
                  <Drag
                    key={banner.id}
                    draggableId={`banner${banner.id}`}
                    index={index}
                  >
                    <BannerColumn banner={banner} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateBanner />
          </ColumnContainer>
        )}
        <EpicModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const ColumnContainer = styled("div")`
  display: flex;
  flex: 1;
  overflow-x: auto;
`;
