import { useState, useEffect, useMemo, useCallback } from "react";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { Project } from "types/project";
import { Search } from "./search";
// import qs from "qs";
// import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
// import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

const Container = styled.div`
  padding: 3rem;
`;

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  // const [, setParams] = useState({
  //   name: "",
  //   personId: "",
  // });

  // keys参数是引用类型，对比时每次都会重新渲染
  // 将keys放到state里面就没问题
  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  // const [params, setParams] = useUrlQueryParam(keys);

  const [params, setParams] = useProjectsSearchParams();
  const debouncedParams = useDebounce(params, 500);

  // const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);

  // const client = useHttp();
  // const { run, isLoading, error, data: list } = useAsync<Project[]>();
  // const { isLoading, error, data: list, retry } = useProjects(debouncedParams);
  const { isLoading, error, data: list } = useProjects(debouncedParams);
  const { data: users } = useUsers();

  // useEffect(() => {
  //   console.log("index-effect");

  // run(client("projects", { data: cleanObject(debouncedParams) }));

  // setLoading(true);
  // client("projects", { data: cleanObject(debouncedParams) })
  //   .then(setList)
  //   .catch((error) => {
  //     setList([]);
  //     setError(error.data);
  //   })
  //   .finally(() => setLoading(false));

  // fetch(
  //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`
  // ).then(async (res) => {
  //   if (res.ok) {
  //     setList(await res.json());
  //   }
  // });
  // }, [debouncedParams]);

  // useMount(() => {
  //   client("users").then(setUsers);
  //   // fetch(`${apiUrl}/users`).then(async (res) => {
  //   //   if (res.ok) {
  //   //     setUsers(await res.json());
  //   //   }
  //   // });
  // });

  const { open } = useProjectModal();

  return (
    <Container>
      <Row between>
        <h2>Project List</h2>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <Search params={params} setParams={setParams} users={users || []} />
      {error ? (
        <ErrorBox error={error} />
      ) : // <Typography.Text type="danger">{error.message}</Typography.Text>
      null}
      <List
        // refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;
