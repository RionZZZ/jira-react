import { Button, Drawer } from "antd";

export const ProjectModal = ({
  openModal,
  onClose,
}: {
  openModal: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={openModal} width={"100%"} onClose={onClose}>
      <h2>Project Modal</h2>
      <Button onClick={onClose}>close</Button>
    </Drawer>
  );
};
