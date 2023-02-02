import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";

export const RegisterScreen: React.FC = () => {
  const { register } = useAuth();

  // const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
  //   register({ username, password });
  // };

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "must name!" }]}
      >
        <Input placeholder="username" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "must pwd!" }]}
      >
        <Input placeholder="pwd" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          register
        </Button>
      </Form.Item>
    </Form>
  );
};
