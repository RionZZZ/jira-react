import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector(selectProjectModalOpen);

  return (
    <Drawer
      open={modalOpen}
      width={"100%"}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h2>Project Modal</h2>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        close
      </Button>
    </Drawer>
  );
};
