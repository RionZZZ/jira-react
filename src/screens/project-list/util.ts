import { useProject } from "./../../utils/project";
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

export const useProjectQueryKey = () => {
  const [searchParams] = useProjectsSearchParams();
  return ["projects", searchParams];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    projectCreate && setProjectCreate({ projectCreate: undefined });
    editingProjectId && setEditingProjectId({ editingProjectId: undefined });
  };
  // return [projectCreate === "true", open, close] as const;

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    close,
    open,
    startEdit,
    editingProject,
    isLoading,
  };
};
