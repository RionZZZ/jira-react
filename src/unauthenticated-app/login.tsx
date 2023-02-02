import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";

export const LoginScreen: React.FC = () => {
  // const { login, user } = useAuth();
  const { login } = useAuth();

  // const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
  //   login({ username, password });
  // };

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      {/* {user ? (
        <div>
          user.name: {user.name} user.token: {user.token}
        </div>
      ) : (
        "no user"
      )} */}
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
        <LongButton htmlType="submit" type="primary">
          login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
