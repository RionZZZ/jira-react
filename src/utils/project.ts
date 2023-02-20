import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetch = () => client("projects", { data: cleanObject(param || {}) });
  useEffect(() => {
    // run(client("projects", { data: cleanObject(param || {}) }));
    run(fetch(), { retry: fetch });
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync();
  const mutate = (params: Partial<Project>) =>
    run(client(`projects/${params.id}`, { data: params, method: "PATCH" }));
  return { mutate, ...result };
};
export const useAddProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync();
  const mutate = (params: Partial<Project>) =>
    run(client(`projects`, { data: params, method: "POST" }));
  return { mutate, ...result };
};
