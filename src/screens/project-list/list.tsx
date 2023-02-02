import { Table } from "antd";

export interface User {
  id: string;
  name: string;
  token: string;
}
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List: React.FC<ListProps> = ({ list, users }) => {
  return (
    <Table
      pagination={false}
      dataSource={list}
      rowKey="id"
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
      ]}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "unknown"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
