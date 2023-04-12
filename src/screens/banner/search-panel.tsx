import { Button, Input } from "antd";
import { EpicTypeSelect } from "components/epic-type-select";
import { Row } from "components/lib";
import { UserSelect } from "components/user-select";
import { useSetUrlSearchParam } from "utils/url";
import { useEpicSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useEpicSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <EpicTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>reset button</Button>
    </Row>
  );
};
