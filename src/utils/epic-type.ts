import { useQuery } from "react-query";
import { EpicType } from "types/project";
import { useHttp } from "./http";

export const useEpicTypes = () => {
  const client = useHttp();
  return useQuery<EpicType[]>(["taskTypes"], () => client("taskTypes"));
};
