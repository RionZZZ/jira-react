import { Banner, Epic } from "types/project";
import { useEpics } from "utils/epic";
import { useEpicTypes } from "utils/epic-type";
import { useBannerQueryKey, useEpicModal, useEpicSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, MenuProps, Modal } from "antd";
import { CreateEpic } from "./create-epic";
import { Mark } from "components/mark";
import { useDeleteBanner } from "utils/banner";
import { Row } from "components/lib";

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
      <Row between>
        <h3>{banner.name}</h3>
        <More id={banner.id} />
      </Row>
      <EpicContainer>
        {epics?.map((epic) => (
          <EpicCard epic={epic} key={epic.id} />
        ))}
        <CreateEpic kanbanId={banner.id} />
      </EpicContainer>
    </Container>
  );
};

const EpicCard = ({ epic }: { epic: Epic }) => {
  const { startEdit } = useEpicModal();
  const { name: keyword } = useEpicSearchParams();
  return (
    <Card style={{ marginBottom: "0.5rem" }} onClick={() => startEdit(epic.id)}>
      <p>
        <Mark name={epic.name} keyword={keyword}></Mark>
      </p>
      <EpicTypeIcon id={epic.typeId} />
    </Card>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutateAsync } = useDeleteBanner(useBannerQueryKey());

  const remove = () => {
    Modal.confirm({
      title: "confirm?",
      onOk: () => mutateAsync({ id }),
    });
  };
  const menuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button type="text" onClick={remove}>
          remove
        </Button>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items: menuItems }}>
      <Button type="link">...</Button>
    </Dropdown>
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
