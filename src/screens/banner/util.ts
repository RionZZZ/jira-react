import { useProject } from "./../../utils/project";
import { useLocation } from "react-router";

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

export const useEpicSearchParams = () => ({
  projectId: useProjectIdFromUrl(),
});

export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
