import { Row, ScreenContainer } from "components/lib";
import { useProjectFromUrl } from "screens/banner/util";
import { useDocumentTitle } from "utils";
import { useDeleteEpics, useEpics } from "utils/epics";
import { useEpics as useTasks } from "utils/epic";
import { useEpicsQueryKey, useEpicsSearchParams } from "./util";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const EpicScreen = () => {
  useDocumentTitle("任务组");

  const { data: currentProject } = useProjectFromUrl();
  const { data: epics } = useEpics(useEpicsSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpics(useEpicsQueryKey());

  const onRemoveClick = (id: number) => {
    Modal.confirm({
      title: "confirm?",
      onOk: () => deleteEpic({ id }),
    });
  };

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}任务组</h1>
      <List
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button type="link" onClick={() => onRemoveClick(epic.id)}>
                    remove
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>startTime: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>endTime: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    key={task.id}
                    to={`/projects/${currentProject?.id}/banner?editingEpicId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
    </ScreenContainer>
  );
};
