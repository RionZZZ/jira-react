import { useCallback, useMemo } from "react";
import { useProject } from "./../../utils/project";
import { useLocation } from "react-router";
import { useUrlQueryParam } from "utils/url";
import { useEpic } from "utils/epic";
import { useDebounce } from "utils";

export const useProjectIdFromUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1] || 0;
  return +id;
};

export const useProjectFromUrl = () => useProject(useProjectIdFromUrl());

export const useBannerSearchParams = () => ({
  projectId: useProjectIdFromUrl(),
});

export const useBannerQueryKey = () => ["banner", useBannerSearchParams()];

export const useEpicSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdFromUrl();
  const debounceName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      // name: param.name,
      name: debounceName,
      typeId: +param.typeId || undefined,
      processorId: +param.processorId || undefined,
      tagId: +param.tagId || undefined,
    }),
    [projectId, param]
  );
};

export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];

export const useEpicModal = () => {
  const [{ editingEpicId }, setEditingEpicId] = useUrlQueryParam([
    "editingEpicId",
  ]);
  const { data: editingEpic, isLoading } = useEpic(+editingEpicId);
  const startEdit = useCallback(
    (id: number) => {
      setEditingEpicId({ editingEpicId: id });
    },
    [setEditingEpicId]
  );
  const close = useCallback(() => {
    setEditingEpicId({ editingEpicId: "" });
  }, [setEditingEpicId]);

  return {
    editingEpicId,
    editingEpic,
    startEdit,
    close,
    isLoading,
  };
};
