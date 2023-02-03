import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { List } from "./list";
import { Search } from "./search";
// import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debouncedParams = useDebounce(params, 500);

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const client = useHttp();

  useEffect(() => {
    console.log("index-effect");

    setLoading(true);
    client("projects", { data: cleanObject(debouncedParams) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error.data);
      })
      .finally(() => setLoading(false));

    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`
    // ).then(async (res) => {
    //   if (res.ok) {
    //     setList(await res.json());
    //   }
    // });
  }, [debouncedParams]);

  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res.ok) {
    //     setUsers(await res.json());
    //   }
    // });
  });

  const Container = styled.div`
    padding: 3rem;
  `;

  return (
    <Container>
      <h2>Project List</h2>
      <Search params={params} setParams={setParams} users={users} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={loading} dataSource={list} users={users} />
    </Container>
  );
};
