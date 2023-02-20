import React from "react";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

export const UserSelect: React.FC<React.ComponentProps<typeof IdSelect>> = (
  props
) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
