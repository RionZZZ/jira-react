import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen: React.FC<{
  onError: (error: Error) => void;
}> = ({ onError }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync();

  // const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
  //   register({ username, password });
  // };

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (!cpassword || cpassword !== values.password) {
      onError(new Error("请确认两次输入密码相同"));
      return;
    }
    run(register(values).catch(onError));
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "confirm pwd!" }]}
      >
        <Input placeholder="cpwd" type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
