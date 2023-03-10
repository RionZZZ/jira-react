import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import useForm from "antd/es/form/hooks/useForm";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { Project } from "./list";
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
    const { projectModalOpen, close, editingProject, isLoading } =
      useProjectModal();
    const [form] = useForm();

    const useMutateProject = editingProject ? useEditProject : useAddProject;
    const {
      mutateAsync,
      error,
      isLoading: isSubmitLoading,
    } = useMutateProject();

    useEffect(() => {
      form.setFieldsValue(editingProject);
    }, [editingProject, form]);

    const handleSubmit = (values: Project) => {
      mutateAsync({ ...editingProject, ...values }).then(() => {
        form.resetFields();
        close();
      });
    };
    return (
      <Drawer
        forceRender
        open={projectModalOpen}
        width={"100%"}
        onClose={close}
      >
        <Container>
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <>
              <h2>{editingProject ? "edit project" : "add project"}</h2>
              <ErrorBox error={error} />
              <Form
                form={form}
                layout="vertical"
                style={{ width: "40rem" }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  name={"name"}
                  label="Name"
                  rules={[{ required: true, message: "must name!" }]}
                >
                  <Input placeholder="name" type="text" id={"name"} />
                </Form.Item>
                <Form.Item
                  name={"organization"}
                  label="Organization"
                  rules={[{ required: true, message: "must organization!" }]}
                >
                  <Input placeholder="organization" id={"organization"} />
                </Form.Item>
                <Form.Item name={"personId"} label="PersonId">
                  <UserSelect defaultOptionName="负责人" />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={isSubmitLoading}
                    htmlType="submit"
                    type="primary"
                  >
                    submit
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Container>
      </Drawer>
    );
  };

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
