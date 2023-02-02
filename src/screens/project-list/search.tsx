import { Form, Input, Select } from "antd";
import { User } from "./list";

interface SearchProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchProps["params"]) => void;
}

export const Search: React.FC<SearchProps> = ({ users, params, setParams }) => {
  return (
    <Form>
      <div>
        <Input
          type="text"
          value={params.name}
          onChange={(env) => setParams({ ...params, name: env.target.value })}
        />
        <Select
          value={params.personId}
          onChange={(personId) => setParams({ ...params, personId })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Form>
  );
};
