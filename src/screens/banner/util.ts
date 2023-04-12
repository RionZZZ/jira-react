import { useMemo } from "react";
import { useProject } from "./../../utils/project";
import { useLocation } from "react-router";
import { useUrlQueryParam } from "utils/url";

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
  return useMemo(
    () => ({
      projectId,
      name: param.name,
      typeId: +param.typeId || undefined,
      processorId: +param.processorId || undefined,
      tagId: +param.tagId || undefined,
    }),
    [projectId, param]
  );
};

export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
