import { useMemo, useState } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [params, setParams] = useUrlQueryParam(keys);
  return [
    useMemo(
      () => ({
        ...params,
        personId: Number(params.personId) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });
  // return [projectCreate === "true", open, close] as const;
  return {
    projectModalOpen: projectCreate === "true",
    close,
    open,
  };
};
