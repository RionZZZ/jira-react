import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useBanners, useReorderBanner } from "utils/banner";
import { BannerColumn } from "./banner-column";
import { SearchPanel } from "./search-panel";
import {
  useBannerSearchParams,
  useEpicSearchParams,
  useProjectFromUrl,
} from "./util";
import { useEpics, useReorderEpic } from "utils/epic";
import { Spin } from "antd";
import { CreateBanner } from "./create-banner";
import { EpicModal } from "./epic-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { useCallback } from "react";

export const BannerScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectFromUrl();
  const { data: banners, isLoading: bannerLoading } = useBanners(
    useBannerSearchParams()
  );
  const { isLoading: epicLoading } = useEpics(useEpicSearchParams());
  const isLoading = bannerLoading || epicLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

export const useDragEnd = () => {
  const { data: banners } = useBanners(useBannerSearchParams());
  const { mutate: recorderBanner } = useReorderBanner();
  const { data: epics = [] } = useEpics(useEpicSearchParams());
  const { mutate: recorderEpic } = useReorderEpic();
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return;
      console.log(type);
      // banner排序
      if (type === "COLUMN") {
        const fromId = banners?.[source.index].id;
        const toId = banners?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) return;
        const type = destination.index > source.index ? "after" : "before";
        recorderBanner({ fromId, referenceId: toId, type });
      }
      // epic排序
      if (type === "ROW") {
        const fromBanner = +source.droppableId;
        const toBanner = +destination.droppableId;
        // 不允许跨banner移动
        // if (fromBanner !== toBanner) return;
        const fromEpicId = epics?.filter(
          (epic) => epic.kanbanId === fromBanner
        )[source.index].id;
        const toEpicId = epics?.filter((epic) => epic.kanbanId === toBanner)[
          destination.index
        ].id;
        if (fromEpicId === toEpicId) return;
        const type =
          fromBanner === toBanner && destination.index > source.index
            ? "after"
            : "before";
        recorderEpic({
          fromId: fromEpicId,
          referenceId: toEpicId,
          type,
          fromKanbanId: fromBanner,
          toKanbanId: toBanner,
        });
      }
    },
    [banners, epics, recorderBanner, recorderEpic]
  );
};

export const ColumnContainer = styled("div")`
  display: flex;
  flex: 1;
  overflow-x: auto;
`;
