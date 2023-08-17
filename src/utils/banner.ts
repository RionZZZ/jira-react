import { QueryKey, useMutation, useQuery } from "react-query";
import { Banner } from "types/project";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useBanners = (param?: Partial<Banner>) => {
  const client = useHttp();
  return useQuery<Banner[]>(["banner", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Banner>) =>
      client("kanbans", { data: params, method: "POST" }),
    useAddConfig(queryKey)
  );
};

export const useDeleteBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}
export const useReorderBanner = () => {
  const client = useHttp();
  return useMutation((params: SortProps) =>
    client("kanbans/reorder", { data: params, method: "POST" })
  );
};
