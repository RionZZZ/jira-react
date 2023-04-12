import React from "react";
import { useEpicTypes } from "utils/epic-type";
import { IdSelect } from "./id-select";

export const EpicTypeSelect: React.FC<React.ComponentProps<typeof IdSelect>> = (
  props
) => {
  const { data: epicTypes } = useEpicTypes();
  return <IdSelect options={epicTypes || []} {...props} />;
};
