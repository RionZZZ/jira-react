import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
  gap?: boolean | number;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.between && "space-between"};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  > * + * {
    margin-left: ${(props) =>
      typeof props.gap === "number"
        ? props + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    {/* <Typography.Text type="danger">{error?.message}</Typography.Text> */}
    <ErrorBox error={error} />
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

// 类型守卫
const isError = (value: any): value is Error => value?.message;
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>;
  }
  return null;
};
