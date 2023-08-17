import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/project";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { SortProps } from "./banner";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(["epics", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client("tasks", { data: params, method: "POST" }),
    useAddConfig(queryKey)
  );
};

export const useEpic = (id?: number) => {
  const client = useHttp();
  return useQuery<Epic>(["epic", { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`tasks/${params.id}`, { data: params, method: "PATCH" }),
    useEditConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderEpic = () => {
  const client = useHttp();
  return useMutation((params: SortProps) =>
    client("tasks/reorder", { data: params, method: "POST" })
  );
};
