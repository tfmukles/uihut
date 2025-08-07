"use server";

import "server-only";
import { fetchApi, mutate } from "../utils";
import { TUserlog } from "./types";

export const getUserlog = async (userId: string) => {
  return await mutate<TUserlog>(async () => {
    return await fetchApi<TUserlog>({
      endPoint: `/user-log/${userId}`,
      method: "GET",
    });
  });
};
