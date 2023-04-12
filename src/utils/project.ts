import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { useCallback, useEffect } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/project";
import { useProjectsSearchParams } from "screens/project-list/util";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<Project[]>();

  // const fetch = useCallback(
  //   () => client("projects", { data: cleanObject(param || {}) }),
  //   [client, param]
  // );
  // useEffect(() => {
  //   // run(client("projects", { data: cleanObject(param || {}) }));
  //   run(fetch(), { retry: fetch });
  // }, [fetch, param, run]);

  // return result;

  // return useQuery<Project[], Error>(["projects", param], () =>
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const { run, ...result } = useAsync();
  // const mutate = (params: Partial<Project>) =>
  //   run(client(`projects/${params.id}`, { data: params, method: "PATCH" }));
  // return { mutate, ...result };
  // const queryClient = useQueryClient();

  // const [searchParams] = useProjectsSearchParams();
  // const queryKey = ["projects", searchParams];

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "PATCH" }),
    // {
    //   // onSuccess: () => queryClient.invalidateQueries("projects"),
    //   onSuccess: () => queryClient.invalidateQueries(queryKey),
    //   async onMutate(target) {
    //     const previousItems = queryClient.getQueryData(queryKey);
    //     queryClient.setQueryData(queryKey, (old?: Project[]) => {
    //       return (
    //         old?.map((project) =>
    //           project.id === target.id ? { ...project, ...target } : project
    //         ) || []
    //       );
    //     });
    //     return previousItems;
    //   },
    //   onError(err, newItem, context) {
    //     queryClient.setQueryData(
    //       queryKey,
    //       (context as { previousItems: Project[] }).previousItems
    //     );
    //   },
    // }
    useEditConfig(queryKey)
  );
};
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const { run, ...result } = useAsync();
  // const mutate = (params: Partial<Project>) =>
  //   run(client(`projects`, { data: params, method: "POST" }));
  // return { mutate, ...result };
  // const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { data: params, method: "POST" }),
    // {
    //   onSuccess: () => queryClient.invalidateQueries("projects"),
    // }
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
