import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const LoginScreen: React.FC<{
  onError: (error: Error) => void;
}> = ({ onError }) => {
  // const { login, user } = useAuth();
  const { login } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
  //   login({ username, password });
  // };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // run(login(values).catch(onError));
    try {
      await run(login(values));
    } catch (error) {
      onError(error as Error);
    }
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
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
