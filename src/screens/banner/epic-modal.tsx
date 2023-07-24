import { useEpicModal, useEpicQueryKey } from "./util";
import { useEditEpic } from "utils/epic";
import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { EpicTypeSelect } from "components/epic-type-select";

export const EpicModal = () => {
  const [form] = Form.useForm();
  const { editingEpicId, editingEpic, close } = useEpicModal();
  const { mutateAsync: editEpic, isLoading: editLoading } = useEditEpic(
    useEpicQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editEpic({ ...editingEpic, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingEpic);
  }, [form, editingEpic]);

  return (
    <Modal
      onOk={onOk}
      confirmLoading={editLoading}
      title="edit epic"
      onCancel={onCancel}
      open={!!editingEpicId}
      forceRender
    >
      <Form {...layout} initialValues={editingEpic} form={form}>
        <Form.Item
          label="name"
          name={"name"}
          rules={[{ required: true, message: "name required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="processorId" name={"processorId"}>
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="type" name={"typeId"}>
          <EpicTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
