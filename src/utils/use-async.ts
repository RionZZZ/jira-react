import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  error: null,
  data: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, setState] = useState<State<T>>({
    ...defaultState,
    ...initialState,
  });

  // 惰性初始化，多返回一层来解决
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: T) => {
    setState({
      data,
      status: "success",
      error: null,
    });
  };
  const setError = (error: Error) => {
    setState({
      data: null,
      status: "error",
      error,
    });
  };
  const run = (
    promise: Promise<T>,
    runConfig?: { retry: () => Promise<T> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("must promise");
    }

    setRetry(() => () => {
      // 不会起作用，只是返回了一个被调用过的promise，不会重新调用
      // run(promise);
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig);
      }
    });

    setState({ ...state, status: "loading" });
    return promise
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((error) => {
        setError(error.data);
        if (config.throwOnError) {
          // catch的错误信息，不主动抛出，不会被外面接收到
          return Promise.reject(error);
        } else {
          return error;
        }
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};
