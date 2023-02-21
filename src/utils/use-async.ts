import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

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

  const mountedRef = useMountedRef();

  const setData = useCallback((data: T) => {
    setState({
      data,
      status: "success",
      error: null,
    });
  }, []);
  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      status: "error",
      error,
    });
  }, []);

  // 非基本类型，想要加入依赖，就需要用到useMemo和useCallback
  // 避免每次在页面渲染时都重新创建（新指针），导致页面死循环
  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
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

      // 此时直接setState会直接触发callback依赖里的state，造成无限循环
      // setState({ ...state, status: "loading" });
      setState((prevState) => ({ ...prevState, status: "loading" }));
      return promise
        .then((res) => {
          if (mountedRef.current) {
            setData(res);
          }
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
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

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
