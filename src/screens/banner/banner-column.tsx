import { Banner } from "types/project";
import { useEpics } from "utils/epic";
import { useEpicTypes } from "utils/epic-type";
import { useEpicSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateEpic } from "./create-epic";

const EpicTypeIcon = ({ id }: { id: number }) => {
  const { data: epicTypes } = useEpicTypes();
  const name = epicTypes?.find((type) => type.id === id)?.name;
  if (!name) return null;
  return <img src={name === "task" ? taskIcon : bugIcon} alt="type" />;
};

export const BannerColumn = ({ banner }: { banner: Banner }) => {
  const { data: allEpics } = useEpics(useEpicSearchParams());
  const epics = allEpics?.filter((epic) => epic.kanbanId === banner.id);

  return (
    <Container>
      <h3>{banner.name}</h3>
      <EpicContainer>
        {epics?.map((epics) => (
          <Card style={{ marginBottom: "0.5rem" }} key={epics.id}>
            <div>{epics.name}</div>
            <EpicTypeIcon id={epics.typeId} />
          </Card>
        ))}
        <CreateEpic kanbanId={banner.id} />
      </EpicContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const EpicContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
