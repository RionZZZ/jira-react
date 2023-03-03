import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () =>
  //   {
  //   openModal,
  //   onClose,
  // }: {
  //   openModal: boolean;
  //   onClose: () => void;
  // }
  {
    const { projectModalOpen, close } = useProjectModal();
    return (
      <Drawer open={projectModalOpen} width={"100%"} onClose={close}>
        <h2>Project Modal</h2>
        <Button onClick={close}>close</Button>
      </Drawer>
    );
  };
