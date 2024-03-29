import { useEffect } from "react";
import { useQuery } from "react-query";
import { User } from "types/project";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();

//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//   }, [param]);

//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
