/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { Project, User } from "types/project";

interface SearchProps {
  users: User[];
  params: Partial<Pick<Project, "name" | "personId">>;
  // params: {
  //   name: number;
  //   personId: number;
  // };
  setParams: (params: SearchProps["params"]) => void;
}

export const Search: React.FC<SearchProps> = ({ users, params, setParams }) => {
  return (
    // 使用emotion的css，可以注入css选择器等原生react/style无法提供的功能
    // 需要在组件顶部告知 /* @jsxImportSource @emotion/react */
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="project-name"
          type="text"
          value={params.name}
          onChange={(env) => setParams({ ...params, name: env.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={params.personId}
          onChange={(personId) => setParams({ ...params, personId })}
          defaultOptionName="负责人"
        />
        {/* <Select
          value={params.personId}
          onChange={(personId) => setParams({ ...params, personId })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id + ""}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
