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

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState<State<T>>({
    ...defaultState,
    ...initialState,
  });

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
  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("must promise");
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((error) => {
        setError(error);
        return error;
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
    ...state,
  };
};
