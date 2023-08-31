import { useEpicsQueryKey } from "./util";
import { useAddEpics } from "utils/epics";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "components/lib";
import useForm from "antd/es/form/hooks/useForm";
import { Epic } from "types/epic";
import { useEffect } from "react";
import { useProjectIdFromUrl } from "screens/banner/util";

export const CreateEpics = (
  props: Pick<DrawerProps, "open"> & { onClose: () => void }
) => {
  const [form] = useForm();

  const projectId = useProjectIdFromUrl();

  useEffect(() => {
    form.resetFields();
  }, [form, props.open]);

  const {
    mutateAsync: addEpic,
    isLoading,
    error,
  } = useAddEpics(useEpicsQueryKey());

  const handleSubmit = async (values: Epic) => {
    addEpic({ ...values, projectId }).then(() => {
      props.onClose();
    });
  };

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      forceRender
      destroyOnClose
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h2>add Epics</h2>
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
              <Form.Item>
                <Button loading={isLoading} htmlType="submit" type="primary">
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
