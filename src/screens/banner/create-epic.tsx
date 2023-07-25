import { useEffect, useState } from "react";
import { useEpicQueryKey, useProjectIdFromUrl } from "./util";
import { Button, Card, Input } from "antd";
import { useAddEpic } from "utils/epic";

export const CreateEpic = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdFromUrl();

  const { mutateAsync: addEpic } = useAddEpic(useEpicQueryKey());
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addEpic({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggleMode = () => setInputMode(!inputMode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <Button type="link" onClick={toggleMode}>+ add epic</Button>;
  } else {
    return (
      <Card>
        <Input
          onBlur={toggleMode}
          placeholder="new epic's name"
          onPressEnter={submit}
          autoFocus={true}
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </Card>
    );
  }
};
