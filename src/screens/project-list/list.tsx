import { Dropdown, MenuProps, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { useProjectModal } from "./util";

export interface User {
  id: number;
  name: string;
  token: string;
}
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created?: number;
  pin: boolean;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  // projectButton: JSX.Element;
}

export const List: React.FC<ListProps> = ({
  users,
  refresh,
  // projectButton,
  ...props
}) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);

  const { open } = useProjectModal();

  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      // label: <ButtonNoPadding type="link">edit</ButtonNoPadding>,
      // label: projectButton,
      label: (
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked disabled />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // onCheckedChange={(pin) => mutate({ id: project.id, pin })}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          // dataIndex: "name",
          render(value, project) {
            return <Link to={project.id + ""}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "-"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <Dropdown menu={{ items: menuItems }}>
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
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
