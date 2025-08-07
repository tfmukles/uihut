"use server";

import "server-only";
import { fetchApi, mutate } from "../utils";
import { TIcon } from "./types";

// get products
export const getIcons = async (params: string, signal?: boolean) => {
  const abortController = new AbortController();
  if (signal) {
    abortController.abort();
  }
  return await mutate<TIcon[]>(async () => {
    return await fetchApi<TIcon>({
      endPoint: `/icon?${params}`,
      method: "GET",
      signal: abortController.signal,
    });
  });
};

// get single product
export const getSingleIcon = async (id: string) => {
  return await mutate<TIcon>(async () => {
    return await fetchApi<TIcon>({
      endPoint: `/icon/${id}`,
      method: "GET",
    });
  });
};
