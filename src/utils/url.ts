import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils";

export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in T]: string }),
      [keys, searchParams]
    ),
    // setSearchParams,
    (params: Partial<{ [key in T]: unknown }>) => {
      // const obj = cleanObject({
      //   ...Object.fromEntries(searchParams),
      //   ...params,
      // }) as URLSearchParamsInit;
      // return setSearchParams(obj);

      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const obj = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(obj);
  };
};
