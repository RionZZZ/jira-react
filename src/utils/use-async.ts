import { useCallback, useReducer, useState } from "react";
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  // const [state, setState] = useState<State<T>>({
  //   ...defaultState,
  //   ...initialState,
  // });
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      ...defaultState,
      ...initialState,
    } as State<T>
  );

  // 惰性初始化，多返回一层来解决
  const [retry, setRetry] = useState(() => () => {});

  // const mountedRef = useMountedRef();
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: T) => {
      safeDispatch({
        data,
        status: "success",
        error: null,
      });
    },
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        status: "error",
        error,
      });
    },
    [safeDispatch]
  );

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
      // dispatch((prevState) => ({ ...prevState, status: "loading" }));
      safeDispatch({ status: "loading" });
      return promise
        .then((res) => {
          // if (mountedRef.current) {
          setData(res);
          // }
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
    [config.throwOnError, safeDispatch, setData, setError]
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
