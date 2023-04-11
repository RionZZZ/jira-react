import { useQuery } from "react-query";
import { Banner } from "types/project";
import { useHttp } from "./http";

export const useBanners = (param?: Partial<Banner>) => {
  const client = useHttp();
  return useQuery<Banner[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
