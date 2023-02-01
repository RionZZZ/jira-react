import { useAuth } from "context/auth-context";

export const LoginScreen: React.FC = () => {
  const { login, user } = useAuth();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {user ? (
        <div>
          user.name: {user.name} user.token: {user.token}
        </div>
      ) : (
        "no user"
      )} */}
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id={"password"} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
