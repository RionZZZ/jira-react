import { Dropdown, MenuProps, Modal, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Project, User } from "types/project";
import { useProjectModal, useProjectQueryKey } from "./util";

interface ListProps extends TableProps<Project> {
  users: User[];
  // refresh?: () => void;
  // projectButton: JSX.Element;
}

export const List: React.FC<ListProps> = ({
  users,
  // refresh,
  // projectButton,
  ...props
}) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) =>
    // mutate({ id, pin }).then(refresh);
    mutate({ id, pin });

  const { startEdit } = useProjectModal();

  const editProject = (id: number) => startEdit(id);

  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "confirm delete?",
      content: "click ok",
      okText: "ok",
      onOk: () => {
        deleteProject({ id });
      },
    });
  };

  const menuItems: (id: number) => MenuProps["items"] = (id) => [
    {
      key: "edit",
      // label: <ButtonNoPadding type="link">edit</ButtonNoPadding>,
      // label: projectButton,
      label: (
        <ButtonNoPadding type={"link"} onClick={() => editProject(id)}>
          edit
        </ButtonNoPadding>
      ),
    },
    {
      key: "delete",
      label: (
        <ButtonNoPadding type={"link"} onClick={() => handleDelete(id)}>
          delete
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
                  "佚名"}
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
          title: "操作",
          render(value, project) {
            return (
              <Dropdown menu={{ items: menuItems(project.id) }}>
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
