import React, { Children, ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// export class ErrorBoundary extends React.Component<{
//   children: ReactNode;
//   fallbackRender: FallbackRender;
// }> {}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    } else {
      return children;
    }
  }
}
