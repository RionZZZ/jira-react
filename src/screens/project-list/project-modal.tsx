import { Button, Drawer } from "antd";

export const ProjectModal = ({
  modalOpen,
  onClose,
}: {
  modalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={modalOpen} width={"100%"} onClose={onClose}>
      <h2>Project Modal</h2>
      <Button onClick={onClose}>close</Button>
    </Drawer>
  );
};
