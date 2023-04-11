import { useQuery } from "react-query";
import { Epic } from "types/project";
import { useHttp } from "./http";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
