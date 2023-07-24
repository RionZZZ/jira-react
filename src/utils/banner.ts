import { QueryKey, useMutation, useQuery } from "react-query";
import { Banner } from "types/project";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

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
