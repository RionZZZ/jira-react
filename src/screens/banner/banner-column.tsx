import { Banner } from "types/project";
import { useEpics } from "utils/epic";
import { useEpicSearchParams } from "./util";

export const BannerColumn = ({ banner }: { banner: Banner }) => {
  const { data: allEpics } = useEpics(useEpicSearchParams());
  const epics = allEpics?.filter((epic) => epic.kanbanId === banner.id);

  return (
    <div>
      <h3>{banner.name}</h3>
      {epics?.map((epics) => (
        <div key={epics.id}>{epics.name}</div>
      ))}
    </div>
  );
};
