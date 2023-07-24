import { useState } from "react";
import { useBannerQueryKey, useProjectIdFromUrl } from "./util";
import { useAddBanner } from "utils/banner";
import { Input } from "antd";
import { Container } from "./banner-column";

export const CreateBanner = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdFromUrl();

  const { mutateAsync: addBanner } = useAddBanner(useBannerQueryKey());

  const submit = async () => {
    await addBanner({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size="large"
        placeholder="new banner's name"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
