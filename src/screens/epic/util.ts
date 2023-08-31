import { useProjectIdFromUrl } from "screens/banner/util";

export const useEpicsSearchParams = () => ({
  projectId: useProjectIdFromUrl(),
});

export const useEpicsQueryKey = () => ["Epics", useEpicsSearchParams()];
